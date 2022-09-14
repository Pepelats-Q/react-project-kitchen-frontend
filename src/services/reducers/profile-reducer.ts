import { createSlice } from '@reduxjs/toolkit';
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

interface IFollowUser {
  readonly type: string;
  readonly payload: {
    payload: {
      profile: TUser;
    };
  };
}
interface IUnFollowUser {
  readonly type: string;
  readonly payload: {
    payload: {
      profile: TUser;
    };
  };
}

interface IGetProfile {
  readonly type: string;
  readonly payload: {
    payload: {
      profile: TUser;
    };
  };
}

export type TProfileActions = IFollowUser | IUnFollowUser | IGetProfile;

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
      if (action.payload) {
        state.profile = { ...action.payload.payload.profile };
      }
    },
    profilePageUnload() {
      return { ...initialState };
    },
  },
});

export const { followUser, unFollowUser, getProfile, profilePageUnload } = profileReducer.actions;

export default profileReducer.reducer;
