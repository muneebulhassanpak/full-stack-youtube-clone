import Cookies from "js-cookie";

export const loginCheck = () => {
  const loginStatus = Cookies.get("access_token");
  if (loginStatus == undefined || loginStatus == false) {
    return false;
  }
  return true;
};
