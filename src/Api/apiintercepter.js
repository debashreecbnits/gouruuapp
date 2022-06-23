import axios from "axios";
//import { NotificationManager } from "react-notifications";

const instance = axios.create({});

const successHandler = (res) => {
 
  const  msg  = res.data.message;
  if (msg && msg !== "") {
    const alertType = res.status === 200 ? "success" : "error";
    NotificationManager[alertType](msg, alertType);
  }
  return res;
};
/**
 * axios error response handle
 * @param  {Object} error
 */
const logOut = () => {
  setTimeout(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("myId");
    localStorage.removeItem("userdetails");
    window.location.href = "/login";
  }, 1300);
}
const errorHandler = (error) => {
      console.log("error",error)
  if (error.response.status === 401) {
    NotificationManager.error(error.response.data.msg, "Unautharized");
  }
  else if (error.response.status === 403) {
    NotificationManager.error(
      "something went wrong, try again later " + error.response.status,
      "Server Error"
    );
    logOut();
  }
  else if (error.response) {
    NotificationManager.error(
      "something went wrong, try again later " + error.response.status,
      "Server Error"
    );
  } else
    NotificationManager.error(
      "something went wrong, try again later ",
      "Server Error"
    );
};



instance.interceptors.request.use(
  request => {

    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => successHandler(res),
  (error) => errorHandler(error)
);

export default instance;

