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
    artilePageLoad(state, action: TtodoAny) {
      state.article = action.payload[0].article;
      state.comments = action.payload[1].comments;
    },
    artilePageUnload() {
      return { ...initialState };
    },
    addComment(state, action: AnyAction) {
      state.commentErrors = action.error ? action.payload.errors : null;
      state.comments = action.error
        ? null
        : (state.comments || []).concat([action.payload.comment]);
    },
    deleteComment(state, action: AnyAction) {
      state.comments = state.comments
        ? state.comments.filter((comment) => comment.id !== action.commentId)
        : null;
    },
  },
});

export const { artilePageLoad, artilePageUnload, addComment, deleteComment } =
  articleReducer.actions;

export default articleReducer.reducer;
