import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';

import logger from 'redux-logger';
import rootReducer from "../reducers/index";
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(logger,sagaMiddleware));

store.subscribe(()=>{
    localStorage.setItem('token', JSON.stringify(store.getState().token))
    localStorage.setItem('login', JSON.stringify(store.getState().login))
    localStorage.setItem('customer_id', JSON.stringify(store.getState().customer_id))
    localStorage.setItem('customer_name', JSON.stringify(store.getState().customer_name))
  })
sagaMiddleware.run(rootSaga);

export default store;