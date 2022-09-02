import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/typesTs';
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

const editorReducer = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    // TODO этот экшен вообще нигде не используется. Я его удалил, когда переписывал редактор статей. Может обратно на стор переделать?
    editorPageLoad(state, action: PayloadAction<TtodoAny>) {
      const { payload } = action;
      state.articleSlug = payload ? payload.article.slug : '';
      state.title = payload ? payload.article.title : '';
      state.description = payload ? payload.article.description : '';
      state.body = payload ? payload.article.body : '';
      state.tagInput = '';
      state.tagList = payload ? payload.article.tagList : [];
    },
    editorPageUnload() {
      return { ...initialState };
    },
    articleSubmit(state, action: AnyAction) {
      state.errors = action.error ? action.payload.errors : null;
      state.inProgress = false;
    },
  },
  extraReducers: {
    [asyncStart.type]: (state, action: AnyAction) => {
      if (action.subtype === editorReducer.actions.articleSubmit.type) {
        state.inProgress = true;
      }
    },
  },
});

export const { editorPageLoad, editorPageUnload, articleSubmit } = editorReducer.actions;

export default editorReducer.reducer;
