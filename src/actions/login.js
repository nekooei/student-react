/**
 * Created by milad on 1/28/18.
 */
import {
  UPDATE_LOGIN_TOKEN,
  DELETE_LOGIN_TOKEN
} from './constants';

import {
  checkToken as checkTokenAPI
}from '../utils/api';

export const checkToken = () => dispatch => (
  checkTokenAPI()
    .then(response => {
      if(response.data.valid){
        dispatch({
          type: UPDATE_LOGIN_TOKEN,
          payload: Date.now()
        })
      }else {
        dispatch({
          type: DELETE_LOGIN_TOKEN
        })
      }
    })
);