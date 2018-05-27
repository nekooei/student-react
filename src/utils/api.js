/**
 * Created by milad on 1/27/18.
 */
const SERVER_IP_OR_ADDRESS = 'http://sapi.development.sas';
const SERVER_PORT = 65000;

const getUrl = (route) => `${SERVER_IP_OR_ADDRESS}/v1/${route}`;

const getHeaders = (withAuth) => (
  {
    "Authorization": withAuth ? `Bearer ${localStorage['token']}` : undefined,
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin' : '*'
  }
);

export const checkRegistration = nationalCode => (
  fetch(
    getUrl('student/checkRegister'),
    {
      method : 'POST',
      headers : getHeaders(false),
      body: JSON.stringify({
        nationalCode
      })
    }
  ).then(data => data.json())
);

export const checkToken = () => (
  fetch(
    getUrl('student/checkToken'),
    {
      method: 'GET',
      headers: getHeaders(true)
    }
  ).then(data => data.json())
);

export const getStudentInfo = () => (
  fetch(
    getUrl('student/info'),
    {
      method: 'GET',
      headers: getHeaders(true)
    }
  ).then(data => data.json())
);

export const login = (username, password) =>
  fetch(
    getUrl('student/login'),
    {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({
        nationalCode: username,
        password: password
      })
    }
  ).then(data => data.json());

export const getSchools = () =>{
  return fetch(
    getUrl('student/school'),{
      headers : getHeaders(true),
      method: 'GET'
    }
  ).then(data => data.json());
};

export const getOpenTermOfSchool = (schoolId) =>
  fetch(
    getUrl(`student/school/${schoolId}/openTerm`), {
      headers : getHeaders(true),
      method: 'GET'
    }
  ).then(data => data.json());

export const getTermGroups = (openTermId) =>
  fetch(
    getUrl(`student/${openTermId}/termGroup`),{
      headers : getHeaders(true),
      method: 'GET'
    }
  ).then(data => data.json());

export const getDistance = (schoolId) =>
  fetch(
    getUrl(`student/${schoolId}/distance`),{
      headers: getHeaders(true),
      method: 'GET'
    }
  ).then(data => data.json());

export const getPrice = (schoolId, termId, termGroupId, distance) =>
  fetch(
    getUrl('student/servicePrice'), {
      headers: getHeaders(true),
      body : JSON.stringify({
        termId, schoolId, termGroupId, distance
      }),
      method: 'POST'
    }
  ).then(data => data.json());

export const createServiceRequest = (termGroupId, distance, totalPrice, discountPrice, finalPrice) =>
  fetch(
    getUrl('student/createRequest'), {
      headers: getHeaders(true),
      body : JSON.stringify({
        termGroupId, distance, totalPrice, discountPrice, finalPrice
      }),
      method: 'POST'
    }
  ).then(data => data.json());

export const requestForPaymentToken = (amount) =>
  fetch(
    getUrl('student/requestPaymentToken'),{
      headers : getHeaders(true),
      body: JSON.stringify({
        amount
      }),
      method: 'POST'
    }
  ).then(data => data.json());