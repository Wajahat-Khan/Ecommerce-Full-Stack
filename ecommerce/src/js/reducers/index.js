import {GET_PRODUCTS_SUCCESS,GET_PRODUCTS_FAILURE, GET_CONFIGS_SUCCESS,GET_CONFIGS_FAILURE} from '../constants/action-types';

const initialState = {
    products: [],
    attributes:[],
    attributes_values:[],
    categories:[]
  };
  
  function rootReducer(state = initialState, action) {
    switch(action.type) {
      case GET_PRODUCTS_SUCCESS:
        return {...state, products:action.payload};

      case GET_PRODUCTS_FAILURE: 
        return {...state,  errorMessage: 'Failed adding posts',error: true};

      case GET_CONFIGS_SUCCESS:
        
          return {... state, products:action.payload.products,attributes:action.payload.attributes,attributes_values:action.payload.attributes_values,categories:action.payload.categories }
      default:
          return state;
  }

  };
  
  export default rootReducer;
  