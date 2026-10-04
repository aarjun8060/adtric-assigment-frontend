import { LS_KEY } from "@/constants";

const set = {
  authToken: (data: string) => {
    localStorage.setItem(
      LS_KEY.auth_token,
      JSON.stringify({
        auth_token: data,
      }),
    );
  },
};

const fetch = {
  authToken: () => {
    return localStorage.getItem(LS_KEY.auth_token);
  },
};

const destroy = {
  authToken: () => {
    localStorage.removeItem(LS_KEY.auth_token);
  },
  all: () => {
    localStorage.removeItem(LS_KEY.auth_token);
  },
};

export const storage = {
  set,
  fetch,
  destroy,
};
