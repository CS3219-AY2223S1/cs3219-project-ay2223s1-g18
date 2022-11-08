import axios from "axios";
import { URL_USER_SVC } from "../utils/configs";
import { clearStorage } from "./LocalStorageService";
import { getServiceUrl } from "./serviceUrl";
import {
  clearCookies,
  getAccessToken,
  getRefreshToken,
  isJwtExpired,
  setAccessToken,
} from "./TokenService";

const requestInterceptor = (req) => {
  try {
    var accessToken = getAccessToken();
    if (
      req.url.includes("auth") ||
      req.url.includes("signup") ||
      req.url.includes("password-reset") ||
      (accessToken && !isJwtExpired(accessToken))
    ) {
      req.headers.Authorization = `Bearer ${accessToken}`;
      req.headers.token = `${accessToken}`;
      return req;
    } else {
      console.log("access token expired");
      const refreshToken = getRefreshToken();
      if (refreshToken && isJwtExpired(refreshToken)) {
        clearCookies();
        clearStorage("currentUsername");
        window.location.reload();
      } else {
        return axios
          .get(`${URL_USER_SVC}/get-access/`, {
            headers: { Authorization: `token ${refreshToken}` },
          })
          .then((res) => {
            if (res.data.status) {
              const newAccessToken = res.data.response.accessToken;
              setAccessToken(newAccessToken);

              instance.defaults.headers.common["Authorization"] =
                "Bearer " + newAccessToken;

              req.headers.Authorization = `Bearer ${newAccessToken}`;

              return req;
            }
          })
          .catch((err) => {
            console.log("ACCESS TOKEN ERR: ", err);
          });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const instance = axios.create({
  baseURL: ``,
  timeout: 5000,
});

instance.interceptors.request.use(requestInterceptor);

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
