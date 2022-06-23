/*import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducers from "./Reducers/RootReducer";
export default function configureStore(initialState = {}) {
  return createStore(RootReducers, applyMiddleware(thunk));
}
*/
import {createStore, applyMiddleware, compose} from 'redux';
import hardSet from 'redux-persist/es/stateReconciler/hardSet';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import RootReducers from './Reducers/RootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  keyPrefix: '',
  stateReconciler: hardSet,
  blacklist: [],
};

const pReducer = persistReducer(persistConfig, RootReducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  pReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunk)),
);
export const persistor = persistStore(store);

