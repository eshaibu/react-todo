import axios from "axios";
import { REQUEST_ERROR } from "../redux/actions/action-types";

export default {
  requestInterceptors: () => {
    axios.interceptors.request.use(
      (config) => {
        config.baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000/api/v1";
        return config;
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  },

  responseInterceptors: (store) => {
    axios.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        if (!error.response) {
          store.dispatch({
            type: REQUEST_ERROR,
            payload: { triggeredBy: "SERVER_DOWN", data: { message: "Server down" } },
          });
        }
        return Promise.reject(error);
      }
    );
  },
};
