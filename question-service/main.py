import json
import bs4
import requests
import pymongo
import colorama
import os
from colorama import Back, Fore
from utils import read_tracker, update_tracker, reset_configuration
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from dotenv import load_dotenv


# Setup Selenium Webdriver
CHROMEDRIVER_PATH = r"./driver/chromedriver.exe"
options = Options()
options.headless = True
options.add_argument('--ignore-certificate-errors-spki-list')
options.add_argument('--ignore-ssl-errors')
options.add_argument('--log-level=3')                   # Show only fatal errors
driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH, options=options)


# load environment variables
load_dotenv()
database_connector = os.getenv('DB_CLOUD_URI')

# Initialise MongoDB instance
db_client = pymongo.MongoClient(database_connector)
db_database = db_client["test"]
db_collection = db_database["questions"]

# Initialize Colorama
colorama.init(autoreset=True)

# Get the last problem number we stopped at from our previous download (if any) 
completed_upto = read_tracker("track.conf")


def main():
    # Leetcode API URL to get json of problems on algorithms categories
    ALGORITHMS_ENDPOINT_URL = "https://leetcode.com/api/problems/algorithms/"

    # Problem URL is of the following format format ALGORITHMS_BASE_URL + question__title_slug
    ALGORITHMS_BASE_URL = "https://leetcode.com/problems/"

    # Load JSON from API
    algorithms_problems_json = requests.get(ALGORITHMS_ENDPOINT_URL).content
    algorithms_problems_json = json.loads(algorithms_problems_json)
    

    # List to store questions partial information retrieved from API
    questions_data = []
    for child in algorithms_problems_json["stat_status_pairs"]:

        # Currently we are only processing free problems
        if not child["paid_only"]:
            question__title_slug = child["stat"]["question__title_slug"]
            question__title = child["stat"]["question__title"]
            frontend_question_id = child["stat"]["frontend_question_id"]
            difficulty = child["difficulty"]["level"]
            # total_accepted_solutions = child["stat"]["total_acs"]

            # map difficulty integer values to its corresponding string values
            difficulty_level = "hard"
            if difficulty == 1:
                difficulty_level = "easy"
            elif difficulty == 2:
                difficulty_level = "medium"

            questions_data.append((difficulty, frontend_question_id, question__title_slug, question__title, difficulty_level))
            
    # Sort by difficulty follwed by problem id in ascending order
    questions_data = sorted(questions_data, key=lambda x: (x[0], x[1]))


    try:
        for i in range(completed_upto + 1, len(questions_data)):
            difficulty, frontend_question_id, question__title_slug, question__title, difficulty_level = questions_data[i]
            
            # Forms the url to the leetcode question so that we can access the page and scrape its contents
            url = ALGORITHMS_BASE_URL + question__title_slug

            download_questions(i, url, frontend_question_id, question__title, difficulty, difficulty_level)

    finally:
        # Close the browser after download
        driver.quit()



def download_questions(question_num, url, frontend_question_id, question__title, difficulty, difficulty_level):

    print(Fore.BLACK + Back.CYAN + f"Fetching problem num " + Back.YELLOW + f" {question_num} " + Back.CYAN + " with url " + Back.YELLOW + f" {url} ")

    try:
        driver.get(url)

        # Wait 20 secs or until div with id initial-loading disappears
        element = WebDriverWait(driver, 20).until(
            EC.invisibility_of_element_located((By.ID, "initial-loading"))
        )

        # Get current tab page source
        html = driver.page_source
        soup = bs4.BeautifulSoup(html, "html.parser")

        # Get contents of question
        problem_html = str(soup.find("div", {"class": "content__u3I1 question-content__JfgR"}))
        
        # Get list of topics related to the problem. For example: Dynamic programming, Greedy, String etc...
        topics = ""
        for topic in soup.find_all("span", {"class": "tag__2PqS"}):
            if topics == "":
                topics = ''.join(topic.findAll(text=True))
            else:
                topics += ", " + ''.join(topic.findAll(text=True))

        db_entry = { 
            "question_id": frontend_question_id, 
            "title": question__title,
            "difficulty_index": difficulty,
            "difficulty": difficulty_level,
            "topics": topics,
            "content": problem_html
            }

        db_collection.insert_one(db_entry)

        # Update upto which the problem is downloaded
        update_tracker('track.conf', question_num)
        print(Fore.BLACK + Back.GREEN + f"Writing problem num " + Back.YELLOW + f" {question_num} " + Back.GREEN + " with url " + Back.YELLOW + f" {url} " )
        print(Fore.BLACK + Back.GREEN + " successfull ")

    except Exception as e:
        print(Back.RED + f" Failed Writing!!  {e} ")
        driver.quit()



if __name__ == "__main__":
    main()