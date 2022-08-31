import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { TtodoAny, TArticle } from '../../utils/typesTs';
import { homePageUnload } from './home-reducer';

type TArticleListState = {
  articles: Array<TArticle>;
  articlesCount: number;
  articlesFavorites: Array<TArticle>;
  currentPage: number;
  pager: TtodoAny;
  tab: string | null;
  tag: string | null;
  tags: Array<string>;
};

const initialState: TArticleListState = {
  articles: [],
  articlesCount: 0,
  articlesFavorites: [],
  currentPage: 1,
  pager: null,
  tab: null,
  tag: null,
  tags: [],
};

const articleListReducer = createSlice({
  name: 'articleList',
  initialState,
  reducers: {
    articleFavoriteAdd() {},
    articleFavoriteDelete(state, action: AnyAction) {
      state.articles = state.articles.map((article) => {
        if (article.slug === action.payload.article.slug) {
          return {
            ...article,
            favorited: action.payload.article.favorited,
            favoritesCount: action.payload.article.favoritesCount,
          };
        }
        return article;
      });
    },
    setPage(state, action: AnyAction) {
      state.articles = [...action.payload.articles];
      state.articlesCount = action.payload.articlesCount;
      state.currentPage = action.page;
    },
    applyTagFilter(state, action: AnyAction) {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.currentPage = 0;
      state.pager = action.pager;
      state.tab = null;
      state.tag = action.tag;
    },
    changeTab(state, action: AnyAction) {
      state.pager = action.pager;
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.tab = action.tab;
      state.currentPage = 0;
      state.tag = null;
    },
    profileFavoritesPageLoad(state, action: AnyAction) {
      state.pager = action.pager;
      state.articles = action.payload[1].articles;
      state.articlesCount = action.payload[1].articlesCount;
      state.currentPage = 0;
    },
    loadProfileOwnPosts(state, action: AnyAction) {
      state.articles = action.payload.articles;
    },
    loadProfileFavPosts(state, action: AnyAction) {
      state.articlesFavorites = action.payload.articles;
    },
    profileFavoritesPageUnloaded(){
      return { ...initialState };
    }
  },
  extraReducers: {
    [homePageUnload.type]: (state, action: AnyAction) => {
      state.pager = action.pager;
      state.tags = action.payload[0].tags;
      state.articles = action.payload[1].articles;
      state.articlesCount = action.payload[1].articlesCount;
      state.currentPage = 0;
      state.tab = action.tab;
    },
  },
});

export const { articleFavoriteAdd } = articleListReducer.actions;

export default articleListReducer.reducer;
