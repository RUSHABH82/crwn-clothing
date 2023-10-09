import {rootReducer} from './root-reducer';
import logger from "redux-logger";
import {configureStore} from "@reduxjs/toolkit";


/*
const persistConfig = {
    key: "root", storage, whitelist: ["cart"]
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
*/

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(Boolean)
/*
const composeEnhancers = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancers(applyMiddleware(...middleWares));
*/
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleWares)
});


//export const persistor = persistStore(store)