import {
  UI_SET_SNACK_BAR,
} from '../actions/constants';

const initState = {
  snackBar: {},
  warningDialog: {}
};

export default (state = initState, action) => {
  switch (action.type) {
    case UI_SET_SNACK_BAR:
      return {
        ...state,
        snackBar: {
          show : true,
          message: action.payload
        }
      };
    default:
      return state;
  }
}