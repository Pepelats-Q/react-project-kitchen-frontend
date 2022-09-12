import { createSlice } from '@reduxjs/toolkit';
import { TtodoAny } from '../../utils/types';
import {
  IApplyTagFilter,
  IArticleFavorite,
  IChangeTab,
  ILoadAllArticles,
  ILoadAllTags,
  ISetPageAction,
} from '../../utils/typesActions';
import { TArticle } from '../../utils/typesComponentProps';

type TArticleListState = {
  articles: Array<TArticle>;
  articlesYourFeed: Array<TArticle>;
  articlesProfileYourPosts: Array<TArticle>;
  articlesProfileFavorites: Array<TArticle>;
  articlesCount: number;
  currentPage: number;
  pager: TtodoAny;
  tab: string | null;
  tag: string | null;
  tags: Array<string>;
};

const initialState: TArticleListState = {
  articles: [],
  articlesYourFeed: [],
  articlesProfileYourPosts: [],
  articlesProfileFavorites: [],
  articlesCount: 0,
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
    articleFavorite(state, action: IArticleFavorite) {
      const updateAllLists = (articlesArray: Array<TArticle>) =>
        articlesArray.map((article) => {
          if (article.slug === action.payload.payload.article.slug) {
            return {
              ...article,
              favorited: action.payload.payload.article.favorited,
              favoritesCount: action.payload.payload.article.favoritesCount,
            };
          }
          return article;
        });

      state.articles = updateAllLists(state.articles);
      state.articlesYourFeed = updateAllLists(state.articlesYourFeed);
      state.articlesProfileYourPosts = updateAllLists(state.articlesProfileYourPosts);
      const updatedFavs = updateAllLists(state.articlesProfileFavorites);
      state.articlesProfileFavorites = updatedFavs.filter((article) => article.favorited);
    },
    loadAllArticles(state, action: ILoadAllArticles) {
      state.articles = [...action.payload.payload.articles];
    },
    setPageAction(state, action: ISetPageAction) {
      state.articles = [...action.payload.payload.articles];
      state.articlesCount = action.payload.payload.articlesCount;
      state.currentPage = action.page;
    },
    loadAllTags(state, action: ILoadAllTags) {
      state.tags = [...action.payload.payload.tags];
    },
    applyTagFilter(state, action: IApplyTagFilter) {
      state.articles = action.payload.payload.articles;
      state.articlesCount = action.payload.payload.articlesCount;
      state.currentPage = 0;
      state.pager = action.pager;
      state.tab = null;
      state.tag = action.tag ? action.tag : null;
    },
    changeTab(state, action: IChangeTab) {
      state.pager = action.pager;
      if (action.payload.tab === 'feed') {
        state.articlesYourFeed = action.payload.payload.articles;
      } else if (action.payload.tab === 'your-posts') {
        state.articlesProfileYourPosts = action.payload.payload.articles;
      } else if (action.payload.tab === 'favorites') {
        state.articlesProfileFavorites = action.payload.payload.articles;
      } else {
        state.articles = action.payload.payload.articles;
      }
      state.articlesCount = action.payload.payload.articlesCount;
      state.tab = action.tab ? action.tab : null;
      state.currentPage = 0;
      state.tag = null;
    },
    profileClearArticlesPageUnloaded() {
      return { ...initialState };
    },
    homePageClearArticlesUnloaded() {
      return { ...initialState };
    },
  },
});

export const {
  articleFavorite,
  setPageAction,
  loadAllTags,
  applyTagFilter,
  changeTab,
  profileClearArticlesPageUnloaded,
  homePageClearArticlesUnloaded,
} = articleListReducer.actions;

export default articleListReducer.reducer;
