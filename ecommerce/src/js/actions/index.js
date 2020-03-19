import {GET_PRODUCTS_REQUEST,GET_CONFIGS_REQUEST} from "../constants/action-types";

export function getProducts(payload) {
    return { type: GET_PRODUCTS_REQUEST, payload };
  }

export function getConfigurations(payload) {
    return { type: GET_CONFIGS_REQUEST, payload };
  }