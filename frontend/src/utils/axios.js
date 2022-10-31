import axios from "axios";
import { URL_USER_SVC } from "../utils/configs";
import { clearStorage } from "./LocalStorageService";
import { getServiceUrl } from "./serviceUrl";
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
    req.headers.token = `${accessToken}`;

    return req;
  } catch (err) {
    console.error(err);
  }
};

const instance = axios.create({
  baseURL: ``,
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

    // if (error.response.status === 401) {
    // if (error.response.status === 401 && !originalRequest._retry) {
    // originalRequest._retry = true;
    const refreshToken = getRefreshToken();

    return axios
      .get(`${URL_USER_SVC}/get-access`, {
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
        console.log("ACCESS TPOLENerr: ", err);
        // Refresh Token expired
        if (err.response.status === 401) {
          console.log("REFRESH TOKEN EXPIRED: ", err);

          clearCookies();
          clearStorage("currentUsername");
          window.location.reload();
        }
      });
    // }
    // return Promise.reject(error);
  }
);

export const GETRequest = (service, url, params = {}) => {
  var endpoint = getServiceUrl(service) + url;
  return instance.get(endpoint, { params });
};

export const POSTRequest = (service, url, data = {}) => {
  var endpoint = getServiceUrl(service) + url;
  return instance.post(endpoint, data);
};

export const PATCHRequest = (service, url, data = {}) => {
  var endpoint = getServiceUrl(service) + url;

  return instance.patch(endpoint, data);
};

export const DELETERequest = (service, url, params = {}) => {
  var endpoint = getServiceUrl(service) + url;

  return instance.delete(endpoint, { params });
};
