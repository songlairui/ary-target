import * as cookie from "js-cookie";

export const setCookie = (key: string, value: string) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: "/"
    });
  }
};

export const removeCookie = (key: string) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1
    });
  }
};

export const getCookie = (key: string, allCookie: string) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromRawCookie(key, allCookie);
};

const getCookieFromBrowser = (key: string) => {
  return cookie.get(key);
};

const getCookieFromRawCookie = (key: string, allCookie: string) => {
  if (!allCookie) {
    return undefined;
  }
  const rawCookie = allCookie
    .split(";")
    .find((c: string) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split("=")[1];
};
