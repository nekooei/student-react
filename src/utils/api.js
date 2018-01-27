/**
 * Created by milad on 1/27/18.
 */
const SERVER_IP_OR_ADDRESS = 'http://localhost';
const SERVER_PORT = 6500;

const getUrl = (route) => `${SERVER_IP_OR_ADDRESS}:${SERVER_PORT}/${route}`;

const getHeaders = (withAuth) => (
  {
    "Authorization": withAuth ? `Bearer ${localStorage[token]}` : undefined,
    "Content-Type": "application/json"
  }
);

export const checkRegistration = nationalCode => (
  fetch(
    getUrl('checkRegistration'),
    {
      method : 'POST',
      headers : getHeaders(false),
      body: JSON.stringify({
        nationalCode
      })
    }
  ).then(data => data.json())
);