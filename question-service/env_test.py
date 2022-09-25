import os
from dotenv import load_dotenv

booltest = load_dotenv()
print(booltest)
test = os.getenv('DB_CLOUD_URI')
print(test)


