import { call, takeEvery, put } from 'redux-saga/effects';
import { GET_PRODUCTS_REQUEST,GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAILURE,
    GET_CONFIGS_REQUEST,GET_CONFIGS_SUCCESS,GET_CONFIGS_FAILURE,
    LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE} from '../constants/action-types';

    import API from '../../services';

function* handleProductsSaga(action) {
    try {
        const products = yield call(API.getProducts, action.payload);
        yield put({type: GET_PRODUCTS_SUCCESS, payload: products})
    }
    catch (error) {
        yield put({type: GET_PRODUCTS_FAILURE})
    }
}
function* handleConfigurations(action) {
    try {
        const configs = yield call(API.configuration, action.payload);
        yield put({type: GET_CONFIGS_SUCCESS, payload: configs})
    }
    catch (error) {
        yield put({type: GET_CONFIGS_FAILURE})
    }
}

function* handleLogin(action) {
    try {
        const login = yield call(API.login, action.payload);
        yield put({type: LOGIN_SUCCESS, payload: login})
    }
    catch (error) {
        yield put({type: LOGIN_FAILURE})
    }
}

function* rootSaga() {
    yield takeEvery(GET_PRODUCTS_REQUEST, handleProductsSaga);
    yield takeEvery(GET_CONFIGS_REQUEST, handleConfigurations);
    yield takeEvery(LOGIN_REQUEST, handleLogin);
}

export default rootSaga;