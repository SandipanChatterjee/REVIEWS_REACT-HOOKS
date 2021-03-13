import {
  AUTH_START,
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "../actions/actionsType";
import { updatedObj } from "../utils";
const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  userDetails: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return updatedObj(state, {
        error: action.error,
        loading: action.loading,
      });
    case AUTH_SUCCESS:
      return updatedObj(state, {
        userId: action.userId,
        token: action.token,
        userDetails: action.userDetails,
        error: null,
        loading: false,
      });
    case AUTH_FAIL:
      return updatedObj(state, {
        token: null,
        userId: null,
        loading: false,
        error: action.errorMessage,
      });
    case AUTH_LOGOUT:
      console.log("AUTHLOGOUT###");
      return updatedObj(state, {
        token: null,
        userId: null,
        loading: false,
        error: null,
        userDetails: {},
      });
    default:
      return state;
  }
};

export default reducer;
