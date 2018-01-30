/**
 * Created by milad on 1/30/18.
 */
import {
  SET_STUDENT_INFO,
  REMOVE_STUDENT_INFO
} from '../actions/constants';

const initState = {};

export default (state = initState, action) => {
  switch (action.type){
    case SET_STUDENT_INFO:
      return action.payload;
    case REMOVE_STUDENT_INFO:
      return {};
    default:
        return state;
  }
}