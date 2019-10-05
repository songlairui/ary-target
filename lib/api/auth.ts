import { setCookie, getCookie } from "../session";
import {
  fetcher,
  AUTH_KEY,
  CURRENT_USERNAME,
  LAST_USERNAME,
  v1
} from "./common";

export async function login(username: string, password: string) {
  const { expiresIn, accessToken } = await fetcher(v1("user/get-token"))(
    "POST"
  )({
    username,
    password
  });
  setCookie(AUTH_KEY, accessToken);
  setCookie(CURRENT_USERNAME, username);
}

export function logout() {
  setCookie(AUTH_KEY, "");
  setCookie(LAST_USERNAME, getCookie(CURRENT_USERNAME, "") || "");
  setCookie(CURRENT_USERNAME, "");
}

export function whoami() {
  return fetcher(v1("user/current"))("GET")();
}
