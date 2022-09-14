import { createSlice } from '@reduxjs/toolkit';
import { TArticle, TComment } from '../../utils/types';

type TArticleState = {
  article: TArticle | null;
  comments: Array<TComment> | null;
  commentErrors: { [key: string]: string } | null;
};

const initialState: TArticleState = {
  article: null,
  comments: null,
  commentErrors: null,
};

interface IArticlePageLoad {
  readonly type: string;
  readonly payload: {
    payload: [{ article: TArticle }, { comments: Array<TComment> }];
  };
}

interface IAddComment {
  readonly type: string;
  readonly error?: any;
  readonly payload: {
    errors?: any;
    payload: {
      comment: TComment;
    };
  };
}

interface IDeleteComment {
  readonly type: string;
  readonly payload: {
    commentId: string;
    payload: any;
  };
}

export type TArticleActions = IArticlePageLoad | IAddComment | IDeleteComment;

const articleReducer = createSlice({
  name: 'article',
  initialState,
  reducers: {
    articlePageLoad(state, action: IArticlePageLoad) {
      state.article = action.payload.payload[0].article;
      state.comments = action.payload.payload[1].comments;
    },
    articlePageUnload() {
      return { ...initialState };
    },
    addComment(state, action: IAddComment) {
      state.commentErrors = action.error ? action.payload.errors : null;
      state.comments = action.error
        ? null
        : (state.comments || []).concat([action.payload.payload.comment]);
    },
    deleteComment(state, action: IDeleteComment) {
      state.comments = state.comments
        ? state.comments.filter((comment) => comment.id !== action.payload.commentId)
        : null;
    },
  },
});

export const { articlePageLoad, articlePageUnload, addComment, deleteComment } =
  articleReducer.actions;

export default articleReducer.reducer;
