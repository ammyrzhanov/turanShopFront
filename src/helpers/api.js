import axios from 'axios';
import { apiService } from '../services';
import { server } from '../constants/conf_copy';


let ORIGING
if (process.env.NODE_ENV === "development") {
  ORIGING = (+window.location.port === 3000) ? server.HOSTNAME : "http://127.0.0.1:7000"
}
else if (process.env.NODE_ENV === "production") { ORIGING = (+window.location.port === 5000) ? "http://127.0.0.1:7000" : server.HOSTNAME }
else { ORIGING = server.HOSTNAME }


function getUserData() {
  // return authorization header with jwt token
  let data = JSON.parse(localStorage.getItem('user'));
  const token = data ? data : ""
  return token
}

function authHeader() {
  const data = getUserData()
  if (data) {
    return { 'Authorization': 'Token ' + data };
  } else {
    return {};
  }
}


export const API = new class Axios {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: `${ORIGING}/api/v1`
    });
  }

  get(url) {
    return this.axiosInstance.get(url, { headers: authHeader() }).then(response => handleResponse(response));
  }

  post(url, data, headers) {
    return this.axiosInstance.post(url, data, { headers: headers }).then(response => handleResponse(response));
  }

  put(url, data, headers) {
    return this.axiosInstance.put(url, data, { headers: headers }).then(response => handleResponse(response));
  }

  patch(url, data, headers) {
    return this.axiosInstance.patch(url, data, { headers: headers }).then(response => handleResponse(response));
  }
}

function handleResponse(response) {
  if (response.status === 401) {
    apiService.logout()
    return response.data
  }
  return response.data
}