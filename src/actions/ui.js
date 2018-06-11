import {UI_HIDE_SNACK_BAR, UI_SET_SNACK_BAR} from './constants';

export const setSnackBar = (message) => (
  {
    type: UI_SET_SNACK_BAR,
    payload: message
  }
);

export const hideSnackBar = () => (
  {
    type: UI_HIDE_SNACK_BAR
  }
);