import { clearStorage } from "./LocalStorageService";
import { clearCookies, getRefreshToken, isJwtExpired } from "./TokenService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_AUTH_SVC } from "./configs";

export default function useLogOut() {
  const navigate = useNavigate();
  const refreshToken = getRefreshToken();

  const logoutUser = () => {
    if (isJwtExpired(refreshToken)) {
      clearEverything();
    } else {
      return axios
        .post(`${URL_AUTH_SVC}/logout/`, "", {
          headers: { Authorization: `token ${refreshToken}` },
        })
        .then((res) => {
          if (res.data.status) {
            clearEverything();
          }
        })
        .catch((err) => {
          console.log("err", err);
          navigate("/404");
        });
    }
  };

  const clearEverything = () => {
    clearStorage("currentUsername");
    clearCookies();

    navigate("/");
    window.location.reload();
  };

  return { logoutUser };
}
