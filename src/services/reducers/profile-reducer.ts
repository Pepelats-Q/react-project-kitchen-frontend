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
    payload: TProfileState;
  };
}
interface IUnFollowUser {
  readonly type: string;
  readonly payload: {
    payload: TProfileState;
  };
}

interface IGetProfile {
  readonly type: string;
  readonly payload: {
    payload: TProfileState;
  };
}

export type TProfileActions = IFollowUser | IUnFollowUser | IGetProfile;

const profileReducer = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    followUser(state, action: IFollowUser) {
      state.profile = { ...action.payload.payload.profile };
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
