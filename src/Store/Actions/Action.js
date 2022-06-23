import {
  SET_USER_DETAILS,
  SET_APP_CONFIG,
  RESET_STORE,
  SET_SEARCH_TEXT,
  LOGOUT,
  CHANGE_APP_OPEN_STATUS,
  UPDATE_USER_DETAILS,
  STORE_ACCESS_TOKEN,
  UPDATE_PROFILE,
  DISABLE_DASHBOARD,
  TOGGLED_AS,
} from '../ActionTypes';
export const setUserDetails = (data) => {
  // return {
  //   type: SET_USER_DETAILS,
  //   payload: data,
  // };
};

export const setAppConfig = (data) => {
  return {
    type: SET_APP_CONFIG,
    payload: data,
  };
};

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};
export const setsearchText = (data) => {
  return {
    type: SET_SEARCH_TEXT,
    payload: data,
  };
};

export const updateUserDetails = (data) => {  
  return {
    type: UPDATE_USER_DETAILS,
    payload: {
      data,
    },
  };
};

export const updateProfile = (profileDetails) => {
  return {
    type: UPDATE_PROFILE,
    payload: {
      profileDetails,
    },
  };
};

export const storeAccessToken = (token) => {
  
  return {
    type: STORE_ACCESS_TOKEN,
    payload: {
      token,
    },
  };
};

export const toggledAs = (data) => {
  
  return {
    type: TOGGLED_AS,
    payload: {
      data,
    },
  };
};

export const changeAppOpenStatus = (openAppFirstTime) => {
  return {
    type: CHANGE_APP_OPEN_STATUS,
    payload: {
      openAppFirstTime,
    },
  };
};

export const updateDisableDashboard = (disableDashboard) => {
  return {
    type: DISABLE_DASHBOARD,
    payload: {
      disableDashboard,
    },
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};