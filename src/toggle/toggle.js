import { store } from "../Store/Store";

export const getToggle = () => {
  return new Promise((resolve, reject) => {
    let toggled_as = null;
    const oldState = store.getState();
    const state = { ...oldState };
    if (
      state &&
      state.userDetails &&
      state.userDetails.toggledAs 
    ) {
      token = state.userDetails.toggledAs;
    }
    resolve(toggled_as);
  });
};