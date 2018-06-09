import {UI_SET_SNACK_BAR} from './constants';

export const setSnackBar = (message) => (
  {
    type: UI_SET_SNACK_BAR,
    payload: message
  }
);