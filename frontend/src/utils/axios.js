import axios from "axios";
import { URL_USER_SVC } from "../utils/configs";

const instance = axios.create({
  baseURL: `${URL_USER_SVC}`,
  timeout: 5000,
});

export const GETRequest = (url, params = {}) => {
  return instance.get(url, { params });
};

export const POSTRequest = (url, data = {}) => {
  return instance.post(url, data);
};

export const PUTRequest = (url, data = {}) => {
  return instance.put(url, data);
};

export const DELETERequest = (url, params = {}) => {
  return instance.delete(url, { params });
};
