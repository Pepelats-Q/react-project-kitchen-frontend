import { AnyAction, createSlice } from '@reduxjs/toolkit';
import { TtodoAny, TArticle } from '../../utils/typesTs';
import { homePageLoad, homePageUnload } from './home-reducer';

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
    articleFavorite(state, action: AnyAction) {
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
    loadAllArticles(state, action: AnyAction) {
      state.articles = [...action.payload.payload.articles];
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
      state.tab = action.tab;
      state.currentPage = 0;
      state.tag = null;
    },

    profileClearArticlesPageUnloaded() {
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
  profileClearArticlesPageUnloaded,
} = articleListReducer.actions;

export default articleListReducer.reducer;
