import {
  SET_USER_DETAILS,
  RESET_STORE,
  LOGOUT,
  CHANGE_APP_OPEN_STATUS,
  UPDATE_USER_DETAILS,
  STORE_ACCESS_TOKEN,
  UPDATE_PROFILE,
  DISABLE_DASHBOARD,
  TOGGLED_AS,
  REMEMBER_ME,
} from '../ActionTypes';

const initialState = {
  userDetails: [],
  data: null,
  accessToken: '',
  openAppFirstTime: true,
  profileDetails:null,
  disableDashboard: false,
  toggled_as:'',
  remember_me : false
};

export default function userDetails (state = initialState, action) {
  let newState = {...state};
  switch (action.type) {

    // case SET_USER_DETAILS:
    //   // return [
    //   //     ...state,
    //   //     {userDetails: action.payload}
    //   // ]
    //   return { ...state, userDetails: action.payload };
    // case RESET_STORE:
    //   return { ...state, userDetails: null};

    case STORE_ACCESS_TOKEN: {
      newState.accessToken = action.payload.token;
      break;
    }

    case UPDATE_USER_DETAILS: {
      newState.data = action.payload.data;
      break;
    }

    case UPDATE_PROFILE: {
      newState.profileDetails = action.payload.profileDetails;
      break;
    }

    case TOGGLED_AS: {
      newState.toggled_as = action.payload.toggled_as;
      break;
    }

    case REMEMBER_ME: {
      newState.remember_me = action.payload.REMEMBER_ME;
      break;
    }

    case CHANGE_APP_OPEN_STATUS: {
      newState.openAppFirstTime = action.payload.openAppFirstTime;
      break;
    }
    case LOGOUT: {
      
      //newState = initialState;
      newState.data = null;
      newState.accessToken = '';
      newState.openAppFirstTime = true;
      newState.profileDetails= null;
      newState.disableDashboard = false;
      newState.toggled_as = '';
      break;
    }

    case DISABLE_DASHBOARD: {
      newState.disableDashboard = action.payload.disableDashboard;
      break;
    }

    default:
      break;
  }
  return newState;
};


