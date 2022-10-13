const API_SVC = process.env.REACT_APP_API_SVC;


export const URL_USER_SVC = API_SVC ? API_SVC +  "/api/user" : "http://localhost:8000/api/user";

export const SOCKET_URL = API_SVC ? API_SVC +  "/api/matching" : "http://localhost:8001/";


export const URL_QUESTION_SVC = API_SVC ? API_SVC +  "/api/questions" : "http://localhost:8002/api/questions";

export const URL_USER_HISTORY_SVC = API_SVC ? API_SVC +  "/api/user-history" : "http://localhost:8003/api/user-history";

