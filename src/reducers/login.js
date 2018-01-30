/**
 * Created by milad on 1/30/18.
 */
import {
  UPDATE_LOGIN_TOKEN,
  DELETE_LOGIN_TOKEN
} from '../actions/constants';

const initState = localStorage.token ?
  {token :localStorage.token, lastCheck : Date.now()} : {};

export default (state = initState , action) => {
  switch (action.type){
    case UPDATE_LOGIN_TOKEN:
      return {
        ...initState,
        lastCheck : Date.now()
      };
    case DELETE_LOGIN_TOKEN:
      return {};
    default:
      return state;
  }
}
