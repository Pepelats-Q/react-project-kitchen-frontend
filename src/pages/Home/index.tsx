import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Banner from './Banner/Banner';
import agent from '../../agent';
import styles from './home.module.scss';
import ArticlesWithTabs from '../../components/ArticlesWithTabs/ArticlesWIthTabs';
import {
  changeTab,
  homePageClearArticlesUnloaded,
  loadAllTags,
  setCurrentTabTags,
  setTagDeactive,
} from '../../services/reducers/articlelist-reducer';
import useTranslate from '../../hooks/useTranslate';
import { useDispatch, useSelector } from '../../hooks/hooks';

const Home: FC = () => {
  const dispatch = useDispatch();
  const {
    token,
    articlesAll,
    articlesYourFeed,
    filterActivated,
    articlesAllFiltered,
    articlesYourFeedFiltered,
  } = useSelector((store) => ({
    token: store.common.token,
    articlesAll: store.articleList.articles,
    articlesYourFeed: store.articleList.articlesYourFeed,
    filterActivated: store.articleList.filterActivated,
    articlesAllFiltered: store.articleList.articlesFiltered,
    articlesYourFeedFiltered: store.articleList.articlesYourFeedFiltered,
  }));

  const location = useLocation();
  const localization = useTranslate();
  const isFeed = location.pathname.includes('your-feed');
  const [currentArticles, setCurrentArticles] = useState(articlesAll);

  const onLoad = () => {
    dispatch(loadAllTags({ payload: agent.Tags.getAll() }));
  };
  const onUnload = () => dispatch(homePageClearArticlesUnloaded());

  useEffect(() => {
    onLoad();
    return () => {
      onUnload();
    };
  }, []);

  const defineThisTabTags = (givenArticles: Array<any>) => {
    let allTagsOfThisTab: Array<any> = [];
    givenArticles.forEach((article) => {
      allTagsOfThisTab = allTagsOfThisTab.concat(article.tagList);
    });
    const uniqueArray = allTagsOfThisTab.filter(
      (item, pos) => allTagsOfThisTab.indexOf(item) === pos,
    );
    return uniqueArray;
  };

  const loadYourFeed = () => {
    dispatch(
      changeTab({ tab: 'feed', pager: agent.Articles.feed, payload: agent.Articles.feed() }),
    );
  };

  const loadGlobalFeed = () => {
    dispatch(changeTab({ tab: 'all', pager: agent.Articles.all, payload: agent.Articles.all() }));
  };

  useEffect(() => {
    if (isFeed) {
      loadYourFeed();
    } else {
      loadGlobalFeed();
    }
  }, [isFeed]);

  useEffect(() => {
    dispatch(setTagDeactive());
  }, [location]);

  useEffect(() => {
    if (isFeed) {
      const articles = filterActivated ? articlesYourFeedFiltered : articlesYourFeed;
      setCurrentArticles(articles);
      if (!filterActivated) {
        dispatch(setCurrentTabTags({ payload: defineThisTabTags(articlesYourFeed) }));
      }
    } else {
      const articles = filterActivated ? articlesAllFiltered : articlesAll;
      setCurrentArticles(articles);
      if (!filterActivated) {
        dispatch(setCurrentTabTags({ payload: defineThisTabTags(articlesAll) }));
      }
    }
  }, [
    articlesYourFeed,
    articlesAll,
    isFeed,
    filterActivated,
    articlesYourFeedFiltered,
    articlesAllFiltered,
  ]);

  const tabsNames = [
    { name: localization({ page: 'homePage', key: 'tab2Text' }), path: '/' },
    { name: localization({ page: 'homePage', key: 'tab1Text' }), path: '/your-feed' },
  ];

  const tabsNamesNoAuth = [
    { name: localization({ page: 'homePage', key: 'tab2Text' }), path: '/' },
  ];

  return (
    <div className={styles.home_page}>
      <Banner />
      {token ? (
        <ArticlesWithTabs articles={currentArticles} tabsNames={tabsNames} />
      ) : (
        <ArticlesWithTabs articles={currentArticles} tabsNames={tabsNamesNoAuth} />
      )}
    </div>
  );
};

export default Home;
