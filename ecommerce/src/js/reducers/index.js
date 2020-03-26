import {
  GET_PRODUCTS_REQUEST, GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAILURE,
  GET_CONFIGS_SUCCESS, GET_CONFIGS_FAILURE,
  LOGIN_SUCCESS, LOGIN_FAILURE,
  GET_PRODUCT_BY_CATEGORY_REQUEST, GET_PRODUCT_BY_CATEGORY_SUCCESS, GET_PRODUCT_BY_CATEGORY_FAILURE,
  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST, GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_BY_ID_FAILURE,
  ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE,
  ADD_CART_REQUEST,
  UPDATE_CART_REQUEST,
  OPEN_MODAL_REQUEST,
  CLOSE_MODAL_REQUEST,
  SIGN_OUT_REQUEST,
  SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
  ADD_ORDER_ITEM_REQUEST, ADD_ORDER_ITEM_SUCCESS, ADD_ORDER_ITEM_FAILURE,
  CLOSE_ORDER_COMPLETE_MODAL_REQUEST,CLOSE_ORDER_COMPLETE_MODAL_SUCCESS,CLOSE_ORDER_COMPLETE_MODAL_FAILURE,
  CLOSE_ORDER_SUCCESS_MODAL

} from '../constants/action-types';


const initialState = {

  products: [],

  product: null,
  attributes: [],
  attributes_values: [],
  categories: [],
  token: undefined,
  login: false,
  customer_id: undefined,
  customer_name: undefined,
  order_id: undefined,
  chart: [],
  modal: false,
  signup: false,
  order_state: false,
  order_success:false
};

function rootReducer(state = initialState, action) {
  switch (action.type) {

    // basic products get request reducers
    case GET_PRODUCTS_REQUEST:
      return { ...state, products: [] };
    case GET_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };
    case GET_PRODUCTS_FAILURE:
      return { ...state };


    // getting product by product id  
    case GET_PRODUCT_BY_ID_REQUEST:
      return { ...state, product: null, modal:false };
    case GET_PRODUCT_BY_ID_SUCCESS:
      return { ...state, product: action.payload };
    case GET_PRODUCT_BY_ID_FAILURE:
      return { ...state};

    // search
    case SEARCH_REQUEST:
      return { ...state, products: [] };
    case SEARCH_SUCCESS:
      return { ...state, products: action.payload};
    case SEARCH_FAILURE:
      return { ...state, errorMessage: 'Failed adding posts', error: true };

    // landing page
    case GET_CONFIGS_SUCCESS:
      return { ...state, products: action.payload.products, attributes: action.payload.attributes, attributes_values: action.payload.attributes_values, categories: action.payload.categories,order_state:false  }
    case GET_CONFIGS_FAILURE:
      return { ...state, errorMessage: 'Failed adding posts', error: true };


    // login  
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload.token, login: action.payload.success, customer_id: action.payload.customer_id, customer_name: action.payload.name };
    case LOGIN_FAILURE:
      return { ...state, login: false }


    // getting product by product category
    case GET_PRODUCT_BY_CATEGORY_REQUEST:
      return { ...state, products: [] };
    case GET_PRODUCT_BY_CATEGORY_SUCCESS:
      return { ...state, products: action.payload };
    case GET_PRODUCT_BY_CATEGORY_FAILURE:
      return { ...state};



    // create order in order table on checkout page.
    // order_state is used to open the final popup which will eventually either push
    // the ordered_items or delete the order from order table.  
    case ADD_ORDER_REQUEST:
      return { ...state };
    case ADD_ORDER_SUCCESS:
      return { ...state, order_id: action.payload.order_id, order_state:true };
    case ADD_ORDER_FAILURE:
      return { ...state, order_id: undefined};


    
    // for specific item push
    case ADD_ORDER_ITEM_REQUEST:
      return { ...state };
    case ADD_ORDER_ITEM_SUCCESS:{
      return {...state, order_success:true,order_state:false,order_id:undefined,chart:state.chart.filter((i,index)=>i.product_id != action.payload.product_id)} 
    }     
    case ADD_ORDER_ITEM_FAILURE:
      return { ...state };




    // chart addition and update local
    case ADD_CART_REQUEST:
      return { ...state, chart: [...state.chart, action.payload] };

    case UPDATE_CART_REQUEST:
      return { ...state, chart: action.payload, modal: true };




    // chart modal open and close
    case OPEN_MODAL_REQUEST:
      return { ...state, modal: true};

    case CLOSE_MODAL_REQUEST:
      return { ...state, modal: false };



    // related to sign out button
    case SIGN_OUT_REQUEST:
      return { ...state, token: undefined, login: false, customer_id: undefined, customer_name: undefined, signup: false };
    
    // related to sign up process
    case SIGN_UP_REQUEST:
      return { ...state, signup: false };
    case SIGN_UP_SUCCESS:
      return { ...state, signup: true };
    case SIGN_UP_FAILURE:
      return { ...state, };


    // related to deleting order from orders table
    case CLOSE_ORDER_COMPLETE_MODAL_REQUEST:
      return { ...state };
    case CLOSE_ORDER_COMPLETE_MODAL_SUCCESS:
      return { ...state, order_id:undefined, order_state:false };
    case CLOSE_ORDER_COMPLETE_MODAL_FAILURE:
      return { ...state, };
    
    case CLOSE_ORDER_SUCCESS_MODAL:
      return {...state, order_success:false}
    
    
    default:
      return state;
  }

};

export default rootReducer;
