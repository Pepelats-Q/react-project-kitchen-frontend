import { createSlice } from '@reduxjs/toolkit';
import { IFollowUser, IGetProfile, IUnFollowUser } from '../../utils/typesActions';
import { TUser } from '../../utils/types';

type TProfileState = {
  profile: TUser;
};

const initialState: TProfileState = {
  profile: {
    bio: '',
    following: false,
    image: '',
    username: '',
  },
};

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // TODO: решить что делать с экшенами PROFILE_PAGE_UNLOADED и PROFILE_PAGE_LOADED
    // загрузку профиля - удалила, а разгрузку профиля оставила, используется. Удалять коммент?
    followUser(state, action: IFollowUser) {
      console.log(state, action.payload);
    },
    unFollowUser(state, action: IUnFollowUser) {
      state.profile = { ...action.payload.payload.profile };
    },
    getProfile(state, action: IGetProfile) {
      state.profile = { ...action.payload.payload.profile };
    },
    profilePageUnload() {
      return { ...initialState };
    },
  },
});

export const { followUser, unFollowUser, getProfile, profilePageUnload } = profileReducer.actions;

export default profileReducer.reducer;
