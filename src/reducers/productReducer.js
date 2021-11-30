import {
  FETCHING_STARTED,
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_SKUS,
  SELECT_SIZE,
} from '../actions/actionTypes';

const initialState = {
  products: [],
  productDetail: {
    detail: {},
    availableSkus: null,
    selectedImage: null,
    selectedSize: null,
  },
  fetching: true,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_STARTED:
      return {...state, fetching: true};

    case FETCH_PRODUCTS:
      return {...state, products: action.payload['results'], fetching: false};

    case FETCH_PRODUCT:
      const detail = action.payload;
      return {
        ...state,
        fetching: false,
        productDetail: {...state.productDetail, detail},
      };

    case SELECT_SIZE:
      const selectedSize = action.payload;
      return {...state, productDetail: {...productDetail, selectedSize}};

    case FETCH_SKUS:
      const availableSkus = action.payload;
      return {...state, productDetail: {...productDetail, availableSkus}};

    default:
      return state;
  }
};

export const productsPagesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return action.payload;
    default:
      return state;
  }
};
