/**
 * Created by milad on 1/28/18.
 */
import {
  UPDATE_LOGIN_TOKEN,
  DELETE_LOGIN_TOKEN,
  REMOVE_STUDENT_INFO
} from './constants';

import {
  checkToken as checkTokenAPI
}from '../utils/api';

export const checkToken = () => dispatch => (
  checkTokenAPI()
    .then(response => {
      if(response.success){
        dispatch({
          type: UPDATE_LOGIN_TOKEN,
          payload: Date.now()
        })
      }else {
        dispatch({
          type: DELETE_LOGIN_TOKEN
        });
        dispatch({
          type: REMOVE_STUDENT_INFO
        })
      }
    })
);