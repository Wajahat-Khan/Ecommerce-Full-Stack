import {GET_PRODUCTS_REQUEST,GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAILURE, 
  GET_CONFIGS_SUCCESS,GET_CONFIGS_FAILURE,
  LOGIN_SUCCESS,LOGIN_FAILURE,
  GET_PRODUCT_BY_CATEGORY_REQUEST,GET_PRODUCT_BY_CATEGORY_SUCCESS,GET_PRODUCT_BY_CATEGORY_FAILURE,
  SEARCH_REQUEST,SEARCH_SUCCESS,SEARCH_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,GET_PRODUCT_BY_ID_SUCCESS,GET_PRODUCT_BY_ID_FAILURE} from '../constants/action-types';

const initialState = {
    products: [],
    product:null,
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

      case GET_PRODUCT_BY_ID_REQUEST:
          return {...state, product:null};
      case GET_PRODUCT_BY_ID_SUCCESS:
        return {...state, product:action.payload};
      case GET_PRODUCT_BY_ID_FAILURE: 
        return {...state,  errorMessage: 'Failed adding posts',error: true};  


      case SEARCH_REQUEST:
          return {...state, products:[]};
      case SEARCH_SUCCESS:
        return {...state, products:action.payload};
      case SEARCH_FAILURE: 
        return {...state,  errorMessage: 'Failed adding posts',error: true};


      case GET_CONFIGS_SUCCESS:
          return {... state, products:action.payload.products,attributes:action.payload.attributes,attributes_values:action.payload.attributes_values,categories:action.payload.categories }
      case GET_CONFIGS_FAILURE:
        return {...state,  errorMessage: 'Failed adding posts',error: true};
      
      
      case LOGIN_SUCCESS:
        return {...state, token:action.payload.token, login:action.payload.success};
      case LOGIN_FAILURE:
        return {...state, login:false}
      
      case GET_PRODUCT_BY_CATEGORY_REQUEST:
          return {...state, products:[]};
      case GET_PRODUCT_BY_CATEGORY_SUCCESS:
        return {...state, products:action.payload};
      case GET_PRODUCT_BY_CATEGORY_FAILURE: 
        return {...state,  errorMessage: 'Failed adding posts',error: true};
      
        default:
          return state;
  }

  };
  
  export default rootReducer;
  