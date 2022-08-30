import { TOGGLE_MOBILE_MENU, CHANGE_LANG } from '../constants/actionTypes';

const initialState = {
  isMobileMenuOpen: false,
  currentLang: 'ru'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MOBILE_MENU:
      return {
        ...state,
        isMobileMenuOpen: action.payload,
      };
    
    case CHANGE_LANG: 
    return {
      ...state,
      currentLang: action.payload,
    }

    default:
      return state;
  }
};
