import Cookies from "js-cookie";

export const getAccessToken = () => {
  return Cookies.get("AccessToken");
};

export const getRefreshToken = () => {
  return Cookies.get("RefreshToken");
};

export const setAccessToken = (accessToken) => {
  Cookies.set("AccessToken", accessToken);
};

export const setRefreshToken = (refreshToken) => {
  Cookies.set("RefreshToken", refreshToken);
};

export const clearCookies = () => {
  Cookies.remove("AccessToken");
  Cookies.remove("RefreshToken");
};

export const isJwtExpired = (token) => {
  const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
  return jwtPayload.exp * 1000 < Date.now();
};
