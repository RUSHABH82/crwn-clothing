import {applyMiddleware, compose, createStore, Middleware} from 'redux';

import {rootReducer} from './root-reducer';
import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from "./root-saga";
import {PersistConfig} from "redux-persist/es/types";

export type RootState = ReturnType<typeof rootReducer>

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[]
}
const persistConfig: ExtendedPersistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

const middleWares = [
    process.env.NODE_ENV !== "production" && logger, sagaMiddleware]
    .filter((middleWare): middleWare is Middleware => Boolean(middleWare))

const composeEnhancers = (
    process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));
export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)