import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import app from './reducers'
import dataSaga from './sagas/saga'
import {middleware} from './ReduxAppNavigation'

const sagaMiddleware = createSagaMiddleware();
const appEnhancer = [sagaMiddleware, createLogger(), middleware, thunkMiddleware];

const enhancer = compose(
    applyMiddleware(...appEnhancer)
);

export default function configureStore() {
  const store = createStore(app, undefined, enhancer);
  sagaMiddleware.run(dataSaga);

  return store;
}