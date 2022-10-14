const URI_USER_SVC =
  process.env.REACT_APP_URI_USER_SVC || "http://localhost:8000";

const PREFIX_USER_SVC = "/api/user";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;

export const SOCKET_URL =
  process.env.REACT_APP_URI_MATCHING_SVC || "http://localhost:8001/";

const URI_QUESTION_SVC =
  process.env.REACT_APP_URI_QUESTION_SVC || "http://localhost:8002";

const PREFIX_QUESTION_SVC = "/api/questions";

export const URL_QUESTION_SVC = URI_QUESTION_SVC + PREFIX_QUESTION_SVC;

const PREFIX_USER_HISTORY_SVC = "/api/user-history";

const URI_USER_HISTORY_SVC =
  process.env.REACT_APP_URI_USER_HISTORY_SVC || "http://localhost:8003";

export const URL_USER_HISTORY_SVC =
  URI_USER_HISTORY_SVC + PREFIX_USER_HISTORY_SVC;
