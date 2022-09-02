import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TtodoAny, TArticle } from '../../utils/typesTs';
import { homePageLoad, homePageUnload } from './home-reducer';

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
    articleFavorite(state, action: AnyAction) {
      state.articles = state.articles.map((article) => {
        if (article.slug === action.payload.payload.article.slug) {
          return {
            ...article,
            favorited: action.payload.payload.article.favorited,
            favoritesCount: action.payload.payload.article.favoritesCount,
          };
        }
        return article;
      });
    },
    setPageAction(state, action: AnyAction) {
      state.articles = [...action.payload.payload.articles];
      state.articlesCount = action.payload.payload.articlesCount;
      state.currentPage = action.page;
    },
    applyTagFilter(state, action: TtodoAny) {
      state.articles = action.payload.payload.articles;
      state.articlesCount = action.payload.payload.articlesCount;
      state.currentPage = 0;
      state.pager = action.pager;
      state.tab = null;
      state.tag = action.tag;
    },
    changeTab(state, action: TtodoAny) {
      state.pager = action.pager;
      state.articles = action.payload.payload.articles;
      state.articlesCount = action.payload.payload.articlesCount;
      state.tab = action.tab;
      state.currentPage = 0;
      state.tag = null;
    },
    loadProfileOwnPosts(state, action: PayloadAction<TtodoAny>) {
      state.articles = action.payload.payload.articles;
    },
    loadProfileFavPosts(state, action: AnyAction) {
      state.articlesFavorites = action.payload.payload.articles;
    },
    profileFavoritesPageUnloaded() {
      return { ...initialState };
    },
  },
  extraReducers: {
    [homePageLoad.type]: (state, action: AnyAction) => {
      state.pager = action.pager;
      state.tags = action.payload.payload[0].tags;
      state.articles = action.payload.payload[1].articles;
      state.articlesCount = action.payload.payload[1].articlesCount;
      state.currentPage = 0;
      state.tab = action.tab;
    },
    [homePageUnload.type]: () => ({ ...initialState }),
  },
});

export const {
  articleFavorite,
  setPageAction,
  applyTagFilter,
  changeTab,
  loadProfileOwnPosts,
  loadProfileFavPosts,
  profileFavoritesPageUnloaded,
} = articleListReducer.actions;

export default articleListReducer.reducer;
