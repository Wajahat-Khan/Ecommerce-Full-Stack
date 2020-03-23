import {
  GET_PRODUCTS_REQUEST, GET_CONFIGS_REQUEST, LOGIN_REQUEST,
  GET_PRODUCT_BY_CATEGORY_REQUEST,
  SEARCH_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST,
  ADD_ORDER_REQUEST,
  ADD_CART_REQUEST,
  UPDATE_CART_REQUEST,
  OPEN_MODAL_REQUEST,
  CLOSE_MODAL_REQUEST,
  SIGN_OUT_REQUEST,
  SIGN_UP_REQUEST
} from "../constants/action-types";

export function getProducts(payload) {
  return { type: GET_PRODUCTS_REQUEST, payload };
}

export function getProductById(payload) {
  return { type: GET_PRODUCT_BY_ID_REQUEST, payload };
}

export function getProductsByCategory(payload) {
  return { type: GET_PRODUCT_BY_CATEGORY_REQUEST, payload };
}
export function getConfigurations(payload) {
  return { type: GET_CONFIGS_REQUEST, payload };
}

export function login(payload) {
  return { type: LOGIN_REQUEST, payload };
}

export function signOut(payload) {
  return { type: SIGN_OUT_REQUEST, payload };
}

export function searchProducts(payload) {
  return { type: SEARCH_REQUEST, payload };
}

export function addOrder(payload) {
  return { type: ADD_ORDER_REQUEST, payload };
}

export function addChart(payload) {
  return { type: ADD_CART_REQUEST, payload };
}

export function updateChart(payload) {
  return { type: UPDATE_CART_REQUEST, payload };
}

export function openModal(payload) {
  return { type: OPEN_MODAL_REQUEST, payload };
}
export function closeModal(payload) {
  return { type: CLOSE_MODAL_REQUEST, payload };
}

export function signUp(payload) {
  return { type: SIGN_UP_REQUEST, payload };
}