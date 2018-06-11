/**
 * Created by milad on 1/30/18.
 */
import { combineReducers } from 'redux';

import FetchReducer from './fetch';
import LoginReducer from './login';
import StudentReducer from './student';
import HeaderReducer from './header';
import UiReducer from './ui';

export default combineReducers({
  fetching : FetchReducer,
  student: StudentReducer,
  loginInfo : LoginReducer,
  header : HeaderReducer,
  ui : UiReducer
});