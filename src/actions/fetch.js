/**
 * Created by milad on 1/28/18.
 */
import * as C from './constants';


export const setFetching = ()  => (
    {
      type: C.FETCHING
    }
  );

export const cancelFetching = () => (
    {
      type: C.CANCEL_FETCHING
    }
  );