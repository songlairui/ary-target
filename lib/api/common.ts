import fetch from "isomorphic-unfetch";
import { getCookie } from "../session";

export const HOST = process.env.API_URL || "https://self-answer.songlairui.cn";
export const AUTH_KEY = "AUTH_TOKEN";
export const LAST_USERNAME = "LAST_USERNAME";
export const CURRENT_USERNAME = "CURRENT_USERNAME";

export const isServer = typeof window === "undefined";

export const v1 = (str: string) => `${HOST}/api/v1/${str}`;

export const getAuthHeader = (rawCookie?: string) => {
  let token: string | null;
  if (isServer) {
    token = null;
  } else {
    token = getCookie(AUTH_KEY, rawCookie) || "";
  }
  return token ? { Authorization: `Bearer ${token}` } : null;
};

export const fetcher = (url: string, rawCookie: string = "") => (
  method: Request["method"]
) => (data?: object) =>
  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(rawCookie)
    },
    body: JSON.stringify(data)
  }).then(r => r.json());
