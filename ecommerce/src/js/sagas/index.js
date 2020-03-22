import { call, takeEvery, put } from 'redux-saga/effects';
import { GET_PRODUCTS_REQUEST,GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAILURE,
    GET_CONFIGS_REQUEST,GET_CONFIGS_SUCCESS,GET_CONFIGS_FAILURE,
    LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,
    GET_PRODUCT_BY_CATEGORY_REQUEST,GET_PRODUCT_BY_CATEGORY_SUCCESS,GET_PRODUCT_BY_CATEGORY_FAILURE,
    SEARCH_REQUEST,SEARCH_SUCCESS,SEARCH_FAILURE,
    GET_PRODUCT_BY_ID_REQUEST,GET_PRODUCT_BY_ID_SUCCESS,GET_PRODUCT_BY_ID_FAILURE,
    ADD_ORDER_REQUEST,ADD_ORDER_SUCCESS,ADD_ORDER_FAILURE
} from '../constants/action-types';

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
function* handleProductsByCategory(action) {
    try {
        const products = yield call(API.getProductsByCategory, action.payload);
        yield put({type: GET_PRODUCT_BY_CATEGORY_SUCCESS, payload: products})
    }
    catch (error) {
        yield put({type: GET_PRODUCT_BY_CATEGORY_FAILURE})
    }
}

function* handleSearch(action) {
    try {
        const products = yield call(API.searchProducts, action.payload);
        yield put({type: SEARCH_SUCCESS, payload: products})
    }
    catch (error) {
        yield put({type: SEARCH_FAILURE})
    }
}

function* handleProductById(action) {
    try {
        const products = yield call(API.ProductById, action.payload);
        yield put({type:GET_PRODUCT_BY_ID_SUCCESS , payload: products})
    }
    catch (error) {
        yield put({type: GET_PRODUCT_BY_ID_FAILURE})
    }
}

function* handleAddOrder(action) {
    try {
        const order = yield call(API.addOrder, action.payload);
        yield put({type:ADD_ORDER_SUCCESS , payload: order})
    }
    catch (error) {
        yield put({type: ADD_ORDER_FAILURE})
    }
}
function* rootSaga() {
    yield takeEvery(GET_PRODUCTS_REQUEST, handleProductsSaga);
    yield takeEvery(GET_CONFIGS_REQUEST, handleConfigurations);
    yield takeEvery(LOGIN_REQUEST, handleLogin);
    yield takeEvery(GET_PRODUCT_BY_CATEGORY_REQUEST, handleProductsByCategory);
    yield takeEvery(SEARCH_REQUEST, handleSearch);
    yield takeEvery(GET_PRODUCT_BY_ID_REQUEST, handleProductById);
    yield takeEvery(ADD_ORDER_REQUEST, handleAddOrder);
}

export default rootSaga;