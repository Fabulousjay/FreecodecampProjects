import Cookies from "universal-cookie";

export const getUserToken = () => {
  const cookie = new Cookies();
  return cookie.get("token");
};
