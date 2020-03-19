import { call, takeEvery, put } from 'redux-saga/effects';
import { GET_PRODUCTS_REQUEST,GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAILURE,
    GET_CONFIGS_REQUEST,GET_CONFIGS_SUCCESS,GET_CONFIGS_FAILURE} from '../constants/action-types';

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
        console.log(configs)
        yield put({type: GET_CONFIGS_SUCCESS, payload: configs})
    }
    catch (error) {
        yield put({type: GET_CONFIGS_FAILURE})
    }
}

function* rootSaga() {
    yield takeEvery(GET_PRODUCTS_REQUEST, handleProductsSaga);
    yield takeEvery(GET_CONFIGS_REQUEST, handleConfigurations);
}

export default rootSaga;