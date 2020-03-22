import {GET_PRODUCTS_REQUEST,GET_CONFIGS_REQUEST, LOGIN_REQUEST,
  GET_PRODUCT_BY_CATEGORY_REQUEST,
  SEARCH_REQUEST,
  GET_PRODUCT_BY_ID_REQUEST} from "../constants/action-types";

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
  export function searchProducts(payload) {
    return { type: SEARCH_REQUEST, payload };
  }