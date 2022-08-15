import {
  SETTINGS_SAVED,
  SETTINGS_PAGE_UNLOADED,
  ASYNC_START,
  ASYNC_END,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SETTINGS_SAVED:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
      };
    case SETTINGS_PAGE_UNLOADED:
      return {};
    case ASYNC_START:
      return {
        ...state,
        inProgress: true,
      };
    case ASYNC_END:
      return {
        ...state,
        inProgress: false,
      };
    default:
      return state;
  }
};
