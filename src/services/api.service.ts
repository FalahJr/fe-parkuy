import axios, { AxiosRequestConfig } from "axios";
import { storageService } from ".";

const main = axios.create({
  baseURL: "http://103.150.226.229:3000/api/",
  // baseURL: "http://localhost:3000/api/",
  // baseURL: "https://funny-munich-mother-inter.trycloudflare.com/api/",

  // baseURL: 'https://api.parkuy.com/api/',
});

main.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    const userToken = storageService.getToken() || "";
    config.headers = {
      Authorization: userToken,
      // 'Access-Control-Allow-Credentials' : 'true',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    };

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default main;
