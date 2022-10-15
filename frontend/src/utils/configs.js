const API_SVC = process.env.REACT_APP_API_SVC;
const isUsingGateway = process.env.REACT_APP_IS_USING_GATEWAY === 'true';


export const URL_USER_SVC = isUsingGateway 
    ? API_SVC +  "/api/user" 
    : process.env.REACT_APP_URI_USER_SVC 
    ? process.env.REACT_APP_URI_USER_SVC 
    : "http://localhost:8000/api/user";

export const SOCKET_URL = isUsingGateway 
    ? API_SVC  
    : process.env.REACT_APP_URI_MATCHING_SVC 
    ? process.env.REACT_APP_URI_MATCHING_SVC 
    : "http://localhost:8001/";

export const URL_QUESTION_SVC = isUsingGateway 
    ? API_SVC +  "/api/questions" 
    : process.env.REACT_APP_URI_QUESTION_SVC 
    ? process.env.REACT_APP_URI_QUESTION_SVC 
    : "http://localhost:8002/api/questions";

export const URL_USER_HISTORY_SVC = isUsingGateway 
    ? API_SVC +  "/api/user-history" 
    : process.env.REACT_APP_URI_USER_HISTORY_SVC 
    ? process.env.REACT_APP_URI_USER_HISTORY_SVC 
    : "http://localhost:8003/api/user-history";

