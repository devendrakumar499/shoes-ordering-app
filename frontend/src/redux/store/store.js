import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from "../features/auth/reducer";
import { cartReducer } from "../features/cart/reducer";
import { homeReducer } from "../features/home/reducer";
import { pathReducer } from "../features/path/reducer";
import { prodReducer } from "../features/products/reducer";
import { favouriteReducer } from "../features/favourite/reducer";
import thunk from "redux-thunk";

// reducer is a pure function that takes an action and the previous state of the application and returns the new state

const rootReducer = combineReducers({
  prodReducer,
  pathReducer,
  authReducer,
  homeReducer,
  cartReducer,
  favouriteReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
