/**
 * Created by milad on 1/28/18.
 */
import {
  SET_STUDENT_INFO,
  REMOVE_STUDENT_INFO
} from './constants';
import {
  getStudentInfo
} from '../utils/api';

export const setUserInfo = () => dispatch => (
  getStudentInfo()
    .then(response => (
      dispatch({
        type: SET_STUDENT_INFO,
        payload: response.payload
      })
    ))
);

export const removeUserInfo = () => dispatch => (
  dispatch({
    type: REMOVE_STUDENT_INFO
  })
);