# CS3219-AY22-23-Project-PeerPrep

## About
This is the repository of the PeerPrep platform.

## Contributors
- Ng Hong Ming
- Tang Zhi You
- Theodore Pinto
- Chan Sin Teng, Tiffany


# Deployment
- Navigate to https://frontend-dzqbl74fya-as.a.run.app/ to use Peerprep online.

# Local Orchestration

## Instructions
1. Ensure that you have Docker installed on your local machine.
2. Copy the env variable snippets in Environment Variables to the indicated directories as .env.prod
3. In the main directory where docker-compose.yml is located, run the following command. 
```
docker compose up -d
```
4. If the services are working properly, all the services should be started as shown below.
```
[+] Running 9/9
 ⠿ Network cs3219-project-ay2223s1-g18_default  Created                       1.2s
 ⠿ Container redis                              Started                       4.2s
 ⠿ Container frontend-service                   Started                       4.2s
 ⠿ Container matching-service                   Started                       8.3s
 ⠿ Container user-history-service               Started                       8.2s
 ⠿ Container question-service                   Started                       8.2s
 ⠿ Container user-service                       Started                       8.2s
 ⠿ Container auth-service                       Started                       7.8s
 ⠿ Container gateway-service                    Started                      11.0s
``` 
5. Navigate to http://localhost:3000/ to access the frontend service.
6. Navigate to http://localhost:80/ to access the backend service.


# Environment Variables

## User Service
- Location: ./user-service
```
DB_CLOUD_URI="<insert_uri_here>"
DB_LOCAL_URI="mongodb://mongodb:27017"
ENV="PROD"
REFRESH_TOKEN_SECRET="<insert_generated_token>"
ACCESS_TOKEN_SECRET="<insert_generated_token>"
VERIFICATION_TOKEN_SECRET="<insert_generated_token>"
REFRESH_TOKEN_EXPIRY="12h"
ACCESS_TOKEN_EXPIRY="30m"
VERIFICATION_TOKEN_EXPIRY="15m"
EMAIL_HOST='smtp.gmail.com'
EMAIL_USERNAME='<insert_email>'
EMAIL_PASSWORD='<insert_api_key>'
```

## User History Service
- Location: ./user-history-service
```
DB_CLOUD_URI="<insert_uri_here>"
DB_LOCAL_URI="mongodb://mongodb:27017"
ENV="PROD"
```

## Question Service
- Location: ./question-service
```
DB_CLOUD_URI="<insert_uri_here>"
DB_LOCAL_URI="mongodb://mongodb:27017"
ENV="PROD"
```

## Gateway Service
- Location: ./gateway-service
```
AUTH_SERVICE_URL = http://auth-service:7000
USER_SERVICE_URL = http://user-service:8000
MATCHING_SERVICE_URL = http://matching-service:8001
QUESTION_SERVICE_URL = http://question-service:8002
USER_HISTORY_SERVICE_URL = http://user-history-service:8003
```

## Authentication Service
- Location: ./gateway-service
```
REDIS_URI="redis://redis:6379"
REFRESH_TOKEN_SECRET="<insert_generated_token>"
ACCESS_TOKEN_SECRET="<insert_generated_token>"
VERIFICATION_TOKEN_SECRET="<insert_generated_token>"
REFRESH_TOKEN_EXPIRY="12h"
ACCESS_TOKEN_EXPIRY="30m"
VERIFICATION_TOKEN_EXPIRY="15m"
```

## Frontend Service
- Location: ./frontend
```
REACT_APP_API_SVC = 'http://localhost:80'
REACT_APP_IS_USING_GATEWAY = 'true'
```