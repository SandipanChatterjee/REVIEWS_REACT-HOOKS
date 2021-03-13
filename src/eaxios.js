import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("Reviews.token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    return config;
  }
  // (error) => {
  //   console.log("error", error.response);
  //   if (error.response) {
  //     if (error.response.status === 401) {
  //       // dispatch(logout());
  //       // dispatch(
  //       //   logoutMsg(
  //       //     "To protect your information, we’ve logged you out. When you are ready, please login again."
  //       //   )
  //       // );
  //     }
  //     return Promise.reject(error.response.data);
  //   } else {
  //     return Promise.reject({
  //       data: {
  //         message:
  //           "Looks like the server is taking too long to respond. Please check your internet connection.",
  //         status: 1000,
  //       },
  //     });
  //   }
  // }
);

export default instance;
