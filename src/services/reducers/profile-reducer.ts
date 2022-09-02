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
    followUser(state, action: PayloadAction<TtodoAny>) {
      console.log(state, action);
    },
    unFollowUser(state, action: PayloadAction<TtodoAny>) {
      state.profile = { ...action.payload.payload.profile };
    },
    getProfile(state, action: PayloadAction<TtodoAny>) {
      state.profile = { ...action.payload.payload.profile };
    },
    // TODO: Что тут делают теги?!
    loadAllTags(state, action: PayloadAction<TtodoAny>) {
      state.tags = [...action.payload.payload.tags];
    },
    // TODO: Этот экшен нигде не используется
    profilePageLoad(state, action: PayloadAction<TtodoAny>) {
      state.profile = action.payload[0].profile;
    },
    profilePageUnload() {
      return { ...initialState };
    },
  },
});

export const {
  followUser,
  unFollowUser,
  getProfile,
  loadAllTags,
  profilePageLoad,
  profilePageUnload,
} = profileReducer.actions;

export default profileReducer.reducer;
