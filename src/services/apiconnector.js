import axios from 'axios';

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  const token = localStorage.getItem('token');

  // console.log("im an in")
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '', // Add the token to the headers
    },
    params: params ? params : null,
    withCredentials: true,
  });
};
