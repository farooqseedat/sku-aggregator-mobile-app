import {combineReducers} from 'redux';
import {productReducer, productsPagesReducer} from './productReducer';
import {loginReducer, signUpReducer} from './userReducer';

export default combineReducers({
  entities: productReducer,
  paging: productsPagesReducer,
  signUpStatus: signUpReducer,
  logInStatus: loginReducer,
});
