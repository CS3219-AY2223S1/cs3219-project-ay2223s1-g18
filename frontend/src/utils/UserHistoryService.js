import axios from "axios";
import { URL_USER_HISTORY_SVC } from "./configs";

const instance = axios.create({
  baseURL: `${URL_USER_HISTORY_SVC}`,
  timeout: 5000,
});

export const getUserHistory = (url = "/", params = {}) => {
  return instance.get(url, { params });
};

export const addUserHistory = (url, data = {}) => {
  return instance.post(url, data);
};
