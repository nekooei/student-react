/**
 * Created by milad on 1/27/18.
 */
const SERVER_IP_OR_ADDRESS = 'http://localhost';
const SERVER_PORT = 65000;

const getUrl = (route) => `${SERVER_IP_OR_ADDRESS}:${SERVER_PORT}/v1/${route}`;

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
      header: getHeaders(false),
      body: JSON.stringify({
        nationalCode: username,
        password: password
      })
    }
  ).then(data => data.json());