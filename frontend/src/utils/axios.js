import axios from "axios";
import { URL_USER_SVC } from "../utils/configs";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const getToken = () => {
  var jsonToken = JSON.stringify(getCookie("AccessToken"));
  return jsonToken.substring(1, jsonToken.length - 1);
};

const injectToken = async (req) => {
  try {
    var token = getToken();
    req.headers.Authorization = `Bearer ${token}`;
  } catch (err) {
    console.error(err);
  }
  return req;
};

const instance = axios.create({
  baseURL: `${URL_USER_SVC}`,
  timeout: 5000,
});

instance.interceptors.request.use(injectToken);

export const GETRequest = (url, params = {}) => {
  return instance.get(url, { params });
};

export const POSTRequest = (url, data = {}) => {
  return instance.post(url, data);
};

export const PATCHRequest = (url, data = {}) => {
  return instance.patch(url, data);
};

export const DELETERequest = (url, params = {}) => {
  return instance.delete(url, { params });
};
