import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { TArticle, TComment, TtodoAny } from '../../utils/typesTs';

type TArticleState = {
  article: TArticle | null;
  comments: Array<TComment> | null;
  commentErrors: TtodoAny;
};

const initialState: TArticleState = {
  article: null,
  comments: null,
  commentErrors: null,
};

const articleReducer = createSlice({
  name: 'article',
  initialState,
  reducers: {
    articlePageLoad(state, action: TtodoAny) {
      state.article = action.payload.payload[0].article;
      state.comments = action.payload.payload[1].comments;
    },
    articlePageUnload() {
      return { ...initialState };
    },
    addComment(state, action: AnyAction) {
      state.commentErrors = action.error ? action.payload.errors : null;
      state.comments = action.error
        ? null
        : (state.comments || []).concat([action.payload.payload.comment]);
    },
    deleteComment(state, action: AnyAction) {
      state.comments = state.comments
        ? state.comments.filter((comment) => comment.id !== action.payload.commentId)
        : null;
    },
  },
});

export const { articlePageLoad, articlePageUnload, addComment, deleteComment } =
  articleReducer.actions;

export default articleReducer.reducer;
