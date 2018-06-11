/**
 * Created by milad on 2/17/18.
 */
import {SET_HEADER_SUBTITLE} from './constants';
export const setHeaderSubTitle = headerTitle => (
  {
    type: SET_HEADER_SUBTITLE,
    payload : headerTitle
  }
);