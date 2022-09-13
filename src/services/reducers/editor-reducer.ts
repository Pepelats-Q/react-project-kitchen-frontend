import { createSlice } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/types';
import { IEditorArticleSubmit, IEditorAsyncStart } from '../../utils/typesActions';
import { asyncStart } from './auth-reducer';

type TEditorState = {
  errors: TtodoAny | null;
  inProgress: boolean;
  articleSlug: string;
  title: string;
  description: string;
  body: string;
  tagInput: string;
  tagList: Array<string>;
};

const initialState: TEditorState = {
  errors: null,
  inProgress: false,
  articleSlug: '',
  title: '',
  description: '',
  body: '',
  tagInput: '',
  tagList: [],
};

// TODO: думаю, вообще избавиться от целого редьюсера, а articleSubmit перенести в article или common
const editorReducer = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    articleSubmit(state, action: IEditorArticleSubmit) {
      state.errors = action.error ? action.payload.errors : null;
      state.inProgress = false;
    },
  },
  extraReducers: {
    [asyncStart.type]: (state, action: IEditorAsyncStart) => {
      if (action.subtype === editorReducer.actions.articleSubmit.type) {
        state.inProgress = true;
      }
    },
  },
});

export const { articleSubmit } = editorReducer.actions;

export default editorReducer.reducer;
