/**
 * Created by milad on 2/17/18.
 */
import {SET_HEADER_SUBTITLE} from '../actions/constants';

const initState = { subtitle : ''};

export default (state = initState, action ) => {
  switch (action.type){
    case SET_HEADER_SUBTITLE:
      return {
        ...state,
        subtitle: action.payload
      };
      break;
    default:
      return state;
  }
}
