/**
 * Created by milad on 1/28/18.
 */
import * as C from './constants';


export const setFetching = () => dispatch => {
  dispatch(
    {
      type: C.FETCHING
    }
  );
};

export const cancelFetching = () => dispatch => {
  dispatch(
    {
      type: C.CANCEL_FETCHING
    }
  );
};