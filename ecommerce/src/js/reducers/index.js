import {GET_PRODUCTS_REQUEST,GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAILURE, 
  GET_CONFIGS_SUCCESS,GET_CONFIGS_FAILURE,
  LOGIN_SUCCESS,LOGIN_FAILURE} from '../constants/action-types';

const initialState = {
    products: [],
    attributes:[],
    attributes_values:[],
    categories:[],
    token:"undefined",
    login:false
  };
  
  function rootReducer(state = initialState, action) {
    switch(action.type) {
      case GET_PRODUCTS_REQUEST:
          return {...state, products:[]};
      case GET_PRODUCTS_SUCCESS:
        return {...state, products:action.payload};

      case GET_PRODUCTS_FAILURE: 
        return {...state,  errorMessage: 'Failed adding posts',error: true};

      case GET_CONFIGS_SUCCESS:
          return {... state, products:action.payload.products,attributes:action.payload.attributes,attributes_values:action.payload.attributes_values,categories:action.payload.categories }
      case GET_CONFIGS_FAILURE:
        return {...state,  errorMessage: 'Failed adding posts',error: true};
      case LOGIN_SUCCESS:
        return {...state, token:action.payload.token, login:action.payload.success};
      case LOGIN_FAILURE:
        return {...state, login:false}
      
        default:
          return state;
  }

  };
  
  export default rootReducer;
  