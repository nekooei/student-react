/**
 * Created by milad on 1/30/18.
 */
import  {
  FETCHING,
  CANCEL_FETCHING
} from '../actions/constants';

const initState = false;

export default (state = initState, action) => {
  switch (action.type){
    case FETCHING:
      return true;
    case CANCEL_FETCHING:
      return false;
  }
}