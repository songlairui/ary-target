import fetch from "isomorphic-unfetch";

export const HOST = process.env.API_URL || "xx";
export const AUTH_KEY = "AUTH_TOKEN";
export const LAST_USERNAME = "LAST_USERNAME";
export const CURRENT_USERNAME = "CURRENT_USERNAME";

export const isServer = typeof window === "undefined";

export const v1 = (str: string) => `${HOST}/api/v1/${str}`;

export const getAuthHeader = () => {
  let token: string | null;
  if (isServer) {
    token = null;
  } else {
    token = localStorage.getItem(AUTH_KEY);
  }
  return token ? { Authorization: `Bearer ${token}` } : null;
};

export const fetcher = (url: string) => (method: Request["method"]) => (
  data?: object
) =>
  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader()
    },
    body: JSON.stringify(data)
  }).then(r => r.json());
