"""
    Utility functions to keep track of upto which problems have been downloaded so that we can continue from 
    that problem if downloading of questions stop halfway 
"""

# Tracks the questions we have already downloaded
def update_tracker(file_name, problem_num):
     with open(file_name, "w") as f:
         f.write(str(problem_num))


# Reset count of problems downloaded to potentially restart the download
# May be configured to reset our MongoDB data as well 
def reset_configuration(file_name):
    update_tracker(file_name, -1)



def read_tracker(file_name):
    with open(file_name, "r") as f:
        return int(f.readline())




