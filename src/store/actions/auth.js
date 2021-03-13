import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "./actionsType";
import axios from "../../eaxios";

export const authStart = () => {
  return {
    type: AUTH_START,
    loading: true,
    error: null,
  };
};

export const authFail = (errorMessage) => {
  return {
    type: AUTH_FAIL,
    errorMessage,
  };
};

export const authSuccess = (authData) => {
  console.log(authData);
  return {
    type: AUTH_SUCCESS,
    token: authData.token,
    userId: authData.userDetails.userId,
    userDetails: authData.userDetails,
  };
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  return {
    type: AUTH_LOGOUT,
  };
};

export const auth = (data, type) => {
  return async (dispatch) => {
    dispatch(authStart());
    let url;
    if (type === "login") {
      url = `/api/v1/auth/login`;
    } else {
      url = `/api/v1/auth/register`;
    }
    console.log(data);
    try {
      const result = await axios.post(url, data);
      const authData = {
        userDetails: result.data.data,
        token: result.data.token,
      };
      localStorage.setItem("Reviews.token", authData.token);
      localStorage.setItem("Reviews.UserId", authData.userDetails._id);
      localStorage.setItem("Reviews.email", authData.userDetails.email);
      dispatch(authSuccess(authData));
    } catch (e) {
      dispatch(authFail(e.response.data.error));
    }
  };
};
