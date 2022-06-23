import axios from 'axios';
import { apiBaseUrl} from '../shared/helpers';
import { getToken } from '../token/token';

export const getApi = (apiUrl) => {
  const promise = new Promise((resolve, reject) => {
    axios
      .get(apiBaseUrl + apiUrl)
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });

  return promise;
};

export const apiCallWithToken = async (url, method, data) => {
  const token =  await getToken();
  console.log("tokentokentokentokentoken========>",token)
  const promise = new Promise((resolve, reject) => {
    axios({
      url: apiBaseUrl + url,
      method: method,
      data: data,
      headers: {
        Accept: 'application/json',
        //'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ token
      }
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });

  return promise;
}

export const apiCallWithOutToken = (url, method, data) => {
  const promise = new Promise((resolve, reject) => {
    axios({
      url: apiBaseUrl + url,
      method: method,
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      }
      
    })
      .then(response => {
        resolve(response);
      })
      .catch(err => {
        reject(err);
      });
  });

  return promise;
}
