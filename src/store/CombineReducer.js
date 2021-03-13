import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import reviewReducer from "./reducer/reviews";
import authReducer from "./reducer/auth";

/*const authPersistConfig = {
  key: "auth",
  storage: storage,
  blacklist: ["Auth"],
};

const reviewPersistConfig = {
  key: "reviews",
  storage: storage,
  whitelist: ["Reviews"],
};*/

export const rootReducer = combineReducers({
  Auth: authReducer,
});
