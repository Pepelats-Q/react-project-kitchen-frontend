import { createSlice } from '@reduxjs/toolkit';
import { TArticle, TtodoAny } from '../../utils/types';

type TArticleListState = {
  articles: Array<TArticle>;
  articlesYourFeed: Array<TArticle>;
  articlesProfileYourPosts: Array<TArticle>;
  articlesProfileFavorites: Array<TArticle>;
  articlesFiltered: Array<TArticle>;
  articlesYourFeedFiltered: Array<TArticle>;
  articlesProfileYourPostsFiltered: Array<TArticle>;
  articlesProfileFavoritesFiltered: Array<TArticle>;
  articlesCount: number;
  currentPage: number;
  pager: TtodoAny;
  tab: string | null;
  tag: string | null;
  tags: Array<string>;
  currentTags: Array<string>;
  filterActivated: boolean;
};

interface IArticleFavorite {
  readonly type: string;
  readonly payload: {
    payload: {
      article: TArticle;
    };
  };
}

interface ILoadAllArticles {
  readonly type: string;
  readonly payload: {
    payload: {
      articles: Array<TArticle>;
      articlesCount: number;
    };
  };
}

interface ISetPageAction {
  readonly type: string;
  readonly page?: any;
  readonly payload: {
    readonly page?: any;
    payload: {
      articles: Array<TArticle>;
      articlesCount: number;
    };
  };
}

interface ILoadAllTags {
  readonly type: string;
  readonly payload: {
    payload: {
      tags: Array<string>;
    };
  };
}

interface IApplyTagFilter {
  readonly type: string;
  readonly tag?: string;
  readonly pager?: any;
  readonly payload: {
    tag?: string;
    pager?: any;
    payload: {
      articles: Array<TArticle>;
      articlesCount: number;
    };
  };
}

interface IChangeTab {
  readonly type: string;
  readonly tab?: string;
  readonly pager?: any;
  readonly payload: {
    tab: string;
    pager?: any;
    payload: {
      articles: Array<TArticle>;
      articlesCount: number;
    };
  };
}

export type TArticleListActions =
  | IArticleFavorite
  | ILoadAllArticles
  | ISetPageAction
  | ILoadAllTags
  | IApplyTagFilter
  | IChangeTab;

const initialState: TArticleListState = {
  articles: [],
  articlesYourFeed: [],
  articlesProfileYourPosts: [],
  articlesProfileFavorites: [],
  articlesFiltered: [],
  articlesYourFeedFiltered: [],
  articlesProfileYourPostsFiltered: [],
  articlesProfileFavoritesFiltered: [],
  articlesCount: 0,
  currentPage: 1,
  pager: null,
  tab: null,
  tag: null,
  tags: [],
  currentTags: [],
  filterActivated: false,
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
      state.tag = null;
      state.tab = null;
      state.articlesCount = action.payload.payload.articlesCount;
    },
    setPageAction(state, action: ISetPageAction) {
      state.articles = [...action.payload.payload.articles];
      state.articlesCount = action.payload.payload.articlesCount;
      state.currentPage = action.payload.page;
    },
    loadAllTags(state, action: ILoadAllTags) {
      state.tags = [...action.payload.payload.tags];
    },
    applyTagFilter(state, action: IApplyTagFilter) {
      state.articles = action.payload.payload.articles;
      state.articlesCount = action.payload.payload.articlesCount;
      state.currentPage = 0;
      state.pager = action.payload.pager;
      state.tab = null;
      state.tag = action.payload.tag ? action.payload.tag : null;
    },
    setTagActive(state, action: any) {
      state.tag = action.payload.tag ? action.payload.tag : null;
      state.filterActivated = true;
    },
    setTagDeactive(state) {
      state.tag = '';
      state.filterActivated = false;
    },
    setCurrentTabTags(state, action: any) {
      state.currentTags = action.payload.payload ? action.payload.payload : null;
    },
    changeTab(state, action: IChangeTab) {
      state.pager = action.payload.pager;
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
      state.tab = action.payload.tab ? action.payload.tab : null;
      state.currentPage = 0;
      state.tag = null;
    },
    setFilteredArticles(state, action: any) {
      if (action.payload.tab === 'feed') {
        state.articlesYourFeedFiltered = action.payload.articles;
      } else if (action.payload.tab === 'your-posts') {
        state.articlesProfileYourPostsFiltered = action.payload.articles;
      } else if (action.payload.tab === 'favorites') {
        state.articlesProfileFavoritesFiltered = action.payload.articles;
      } else {
        state.articlesFiltered = action.payload.articles;
      }
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
  loadAllArticles,
  setPageAction,
  loadAllTags,
  applyTagFilter,
  setTagActive,
  setTagDeactive,
  setCurrentTabTags,
  changeTab,
  setFilteredArticles,
  profileClearArticlesPageUnloaded,
  homePageClearArticlesUnloaded,
} = articleListReducer.actions;

export default articleListReducer.reducer;
