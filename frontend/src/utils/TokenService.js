export const getToken = (tokenName) => {
  var jsonToken = JSON.stringify(getCookie(tokenName));
  return jsonToken ? jsonToken.substring(1, jsonToken.length - 1) : "";
};

export const setAccessToken = (accessToken) => {
  document.cookie = `AccessToken=${accessToken}`;
};

export const setRefreshToken = (refreshToken) => {
  document.cookie = `RefreshToken=${refreshToken}`;
};

export const isTokenExpired = (decodedToken) => {
  const tokenExpiry = decodedToken.exp * 1000;
  return tokenExpiry < Date.now();
};

export const clearCookies = () => {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
};

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
