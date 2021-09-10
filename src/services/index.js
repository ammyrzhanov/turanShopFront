import { API } from '../helpers';

export const apiService = {
  login,
  logout,
  // getAllTours,
  // getHistoryTours,
  getPhone, 
  // createTour,
  // updateTour,
  // getLoads,
  // createLoad,
  // updateLoad,
  // createStop,
  // updateStop,
  // register,
  getProfile,
  // currentUserId: currentuserid,
  // createLocation,
  // getAllLocations,
  // getAllUsers,
  // getAllDispatchers,
  // createCompany,
  // getAllCompanies,
  // createCustomer,
  // getAllCustomers,
  // getAllDrivers,
  // getUserById,
  updateUser,
  // updateImage,
  updateProfile,
  // createProfile,
  // updateLicense,
  // createLicense,
  password_change,
  password_reset,
  delete: _delete,
  getNews,
  getHistory
};

function login(login, password) {
  console.log(login, password);
  let data = {
    "login": login,
    "password": +password
  }

  return API.post('/accounts/login/', data)
    .then(user => {
      const token = JSON.stringify(user.token)
      localStorage.setItem('user', token);
      return user;
    });
}

function logout() {
  let token = getUserToken()
  if (token.length > 0) {
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Token ' + token
    };
    localStorage.removeItem('user');
    return API.post(`/accounts/logout/`, {}, headers)
  }
}

function getAllTours(data) {
  return API.get(`/tours/${data}`)
}

function getNews() {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.get('/news/', headers)
}

function getHistory() {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.get('/history/', headers)
}

function getHistoryTours(data) {
  return API.get(`/tourshistory/${data}`)
}

function getPhone(barcode) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.get(`/getphone/${barcode}/`, headers)
}

function createTour(tour) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.post(`/tour/`, tour, headers)
}

function updateTour(tour, id) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.put(`/tour/${id}/`, tour, headers)
}

function getLoads(id) {
  return API.get(`/loads/${id}/`)
}

function createLoad(load) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.post(`/loads/`, load, headers)
}

function updateLoad(load, id) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.put(`/loads/${id}/`, load, headers)
}

function createStop(stop) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.post(`/stop/`, stop, headers)
}

function updateStop(stop, id) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.put(`/stop/${id}/`, stop, headers)
}

function getProfile() {
  return API.get(`/accounts/profile/`)
}

function getAllUsers(data) {
  return API.get(`/users/${data}`)
}

function getAllDispatchers() {
  return API.get('/dispatchers/')
}

function createLocation(data) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.post(`/location/`, data, headers)
}

function getAllLocations() {
  return API.get('/location/')
}

function createCompany(data) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.post(`/companies/`, data, headers)
}

function getAllCompanies() {
  return API.get('/companies/')
}

function createCustomer(data) {
  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.post(`/customers/`, data, headers)
}

function getAllCustomers() {
  return API.get('/customers/')
}

function getAllDrivers() {
  return API.get('/driver/')
}

function getUserById(id) {
  return API.get(`/users/${id}`)
}

function register(user) {
  let data = new FormData();
  data.append('username', user.username);
  data.append('password', user.password);
  data.append('first_name', user.first_name);
  data.append('last_name', user.last_name);
  data.append('role', user.role);

  let headers = {
    'Content-Type': 'text/html'
  };

  return API.post('/register/', data, headers)
}


function updateUser(user, id) {

  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.put(`/cards/${id}/`, JSON.stringify(user), headers)
}

function updateImage(avatar, id) {
  let data = new FormData();
  data.append('avatar', avatar);

  const token = getUserToken()
  const headers = {
    'Content-Type': 'text/html',
    'Authorization': 'Token ' + token
  };
  return API.put(`/avatar/${id}/`, data, headers)
}


function updateProfile(profile, id) {

  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.put(`/profiles/${id}/`, profile, headers)
}

function createProfile(profile) {

  const token = getUserToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.post(`/profiles/`, profile, headers)
}

function updateLicense(license, id) {
  console.log(license);
  let data = new FormData();
  data.append('profile', license.user);
  data.append('unit_number', license.unit_number);
  data.append('location', license.location);
  data.append('expiry', license.expiry);

  const token = getUserToken()
  const headers = {
    'Content-Type': 'text/html',
    'Authorization': 'Token ' + token
  };
  return API.put(`/licenses/${id}/`, data, headers)
}

function createLicense(license) {
  let data = new FormData();
  data.append('profile', license.user);
  data.append('unit_number', license.unit_number);
  data.append('location', license.location);
  data.append('expiry', license.expiry);

  const token = getUserToken()
  const headers = {
    'Content-Type': 'text/html',
    'Authorization': 'Token ' + token
  };
  return API.post(`/licenses/`, data, headers)
}


function password_change(data) {
  let token = getUserToken()

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.put(`/password_change/`, data, headers)
}

function password_reset(data, id) {
  let token = getUserToken()
  
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
  };
  return API.put(`/password_reset/${id}/`, data, headers)
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return API.delete(`/users/${id}/`)
}

export function getUserToken() {
  // return authorization header with jwt token
  const data = JSON.parse(localStorage.getItem('user'));
  const token = data ? data : ""
  return token
}