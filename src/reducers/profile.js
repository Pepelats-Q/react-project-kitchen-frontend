import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_PROFILE_DATA,
  LOAD_ALL_TAGS,
} from '../constants/actionTypes';

export default (state = { profile: {profile: {image: '', username: '', bio: ''}}}, action) => {
  switch (action.type) {
    case PROFILE_PAGE_LOADED:
      return {
        ...action.payload[0].profile,
      };
    case PROFILE_PAGE_UNLOADED:
      return {};
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      return {
        ...action.payload.profile,
      };
    case GET_PROFILE_DATA: 
    return {
      ...state,
      ...action.payload.profile,
    }
    case LOAD_ALL_TAGS: {
      return {
        ...state,
        tags: action.payload.tags
      }
    }
    default:
      return state;
  }
};
