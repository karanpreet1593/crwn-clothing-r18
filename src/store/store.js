import {compose, legacy_createStore as createStore, applyMiddleware, legacy_createStore} from 'redux';
import logger from 'redux-logger';
import { rootReducers } from './root-reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';


const persistConfig = {
  key: 'root',
  storage: storage,
  whiteList: ['cart']
}

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const persistedReducer = persistReducer(persistConfig, rootReducers)

const middleWares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store)