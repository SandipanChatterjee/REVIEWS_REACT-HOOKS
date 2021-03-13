import {
  AUTH_FAIL,
  AUTH_START,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
} from "../actions/actionsType";
import reducer from "./auth";

const obj = {
  error: null,
  loading: false,
  token: null,
  userDetails: {},
  userId: null,
};

describe("Auth Reducer", () => {
  it("Should return default state", () => {
    const newState = reducer(obj, {});
    console.debug(newState);
    expect(newState).toEqual(obj);
  });

  it("Should return new state if receiving type", () => {
    const newState = reducer(obj, AUTH_SUCCESS);
    console.debug(newState);
    expect(newState).toEqual({});
  });
});
