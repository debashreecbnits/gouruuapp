import { store } from "../Store/Store";

export const getToken = () => {
  return new Promise((resolve, reject) => {
    let token = null;
    const oldState = store.getState();
    const state = { ...oldState };
    if (
      state &&
      state.userDetails &&
      state.userDetails.accessToken &&
      state.userDetails.accessToken.length
    ) {
      token = state.userDetails.accessToken;
    }
    resolve(token);
  });
};