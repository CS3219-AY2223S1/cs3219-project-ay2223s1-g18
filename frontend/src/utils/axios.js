import axios from "axios";
import { URL_USER_SVC } from "../utils/configs";
import { clearStorage } from "./LocalStorageService";
import {
  clearCookies,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "./TokenService";

const requestInterceptor = (req) => {
  try {
    var accessToken = getAccessToken();
    req.headers.Authorization = `Bearer ${accessToken}`;
    return req;
  } catch (err) {
    console.error(err);
  }
};

const instance = axios.create({
  baseURL: `${URL_USER_SVC}`,
  timeout: 5000,
});

instance.interceptors.request.use(requestInterceptor);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  // Access Token Expired
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      return axios
        .get(`${URL_USER_SVC}/accesstoken`, {
          headers: { Authorization: `token ${refreshToken}` },
        })
        .then((res) => {
          if (res.data.status) {
            const newAccessToken = res.data.response.accessToken;
            setAccessToken(newAccessToken);

            instance.defaults.headers.common["Authorization"] =
              "Bearer " + newAccessToken;

            return instance(originalRequest);
          }
        })
        .catch((err) => {
          console.log("REFRESH TOKEN EXPIRED: ", err);
          // Refresh Token expired
          if (err.response.status === 401) {
            clearCookies();
            clearStorage("currentUsername");
            window.location.reload();
          }
        });
    }
    return Promise.reject(error);
  }
);

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
