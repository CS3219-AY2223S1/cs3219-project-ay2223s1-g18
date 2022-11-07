import { clearStorage } from "./LocalStorageService";
import { clearCookies, getRefreshToken } from "./TokenService";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { URL_AUTH_SVC } from "./configs";

export default function useLogOut() {
  const logoutUser = () => {
    const navigate = useNavigate();
    const refreshToken = getRefreshToken();
    return axios
      .post(`${URL_AUTH_SVC}/logout/`, "", {
        headers: { Authorization: `token ${refreshToken}` },
      })
      .then((res) => {
        if (res.data.status) {
          clearStorage("currentUsername");
          clearCookies();

          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log("err", err);
        navigate("/404");
      });
  };

  return { logoutUser };
}
