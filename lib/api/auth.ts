import fetch from "isomorphic-unfetch";
import { setCookie, getCookie } from "../session";

const HOST = process.env.API_URL;
export const AUTH_KEY = "AUTH_TOKEN";
export const LAST_USERNAME = "LAST_USERNAME";
export const CURRENT_USERNAME = "CURRENT_USERNAME";

const isServer = typeof window === "undefined";

const v1 = (str: string) => `${HOST}/api/v1/${str}`;

const getAuthHeader = () => {
  let token: string | null;
  if (isServer) {
    token = null;
  } else {
    token = localStorage.getItem(AUTH_KEY);
  }
  return token ? { Authorization: `Bearer ${token}` } : null;
};

const fetcher = (url: string) => (method: Request["method"]) => (
  data: object
) =>
  fetch(v1(url), {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader()
    },
    body: JSON.stringify(data)
  }).then(r => r.json());

export async function login(username: string, password: string) {
  const { expiresIn, accessToken } = await fetcher("user/get-token")("POST")({
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
