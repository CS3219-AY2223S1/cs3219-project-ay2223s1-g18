import axios from "axios";
import { URL_QUESTION_SVC } from "./configs";

const instance = axios.create({
  baseURL: `${URL_QUESTION_SVC}`,
  timeout: 5000,
});

export const QuestionSvcGETRequest = (url = "/", params = {}) => {
  return instance.get(url, { params });
};
