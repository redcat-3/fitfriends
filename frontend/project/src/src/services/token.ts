import { AUTH_TOKEN_KEY_NAME, REFRESH_TOKEN_KEY_NAME } from "../constant";

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};
export const getRefreshToken = (): Token => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};
export const saveRefreshToken = (token: Token): void => {
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
export const dropRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};
