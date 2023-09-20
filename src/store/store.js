import {applyMiddleware, compose, createStore} from 'redux';

import {rootReducer} from './root-reducer';
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import logger from "redux-logger";

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["user"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(Boolean)

const composeEnhancers = (
    process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store)