import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TtodoAny, TUser } from '../../utils/typesTs';

type TProfileState = {
  profile: TUser;
  tags: Array<string>;
};

const initialState: TProfileState = {
  profile: {
    bio: '',
    following: false,
    image: '',
    username: '',
  },
  tags: [],
};

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // TODO: решить что делать с экшенами PROFILE_PAGE_UNLOADED и PROFILE_PAGE_LOADED
    followUser() {},
    unFollowUser() {},
    getProfile(state, action: PayloadAction<TtodoAny>) {
      state.profile = { ...action.payload.profile };
    },
    // TODO: Что тут делают теги?!
    loadAllTags(state, action: PayloadAction<TtodoAny>) {
      state.tags = [...action.payload.tags];
    },
  },
});

export const { followUser, unFollowUser } = profileReducer.actions;

export default profileReducer.reducer;
