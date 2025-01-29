import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8082",
  // timeout: 1000,
  // headers: { "X-Custom-Header": "foobar" },
  // withCredentials: true
});

instance.interceptors.request.use(
  function (config) {
    console.warn("Interceptor on request");

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    console.warn("Interceptor on response", response);

    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default instance;