import { createStore, combineReducers, applyMiddleware } from "redux";

import { getPopular } from "../_reducers/movies";

import { promise, logger } from "./middleware";

const rootReducers = combineReducers({
  getPopular
});

const store = createStore(rootReducers, applyMiddleware(promise, logger));

export default store;
