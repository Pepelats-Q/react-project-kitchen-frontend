import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Banner from './Banner/Banner';
import agent from '../../agent';
import styles from './home.module.scss';
import ArticlesWithTabs from '../../components/ArticlesWithTabs/ArticlesWIthTabs';
// import Tabs from '../../components/Tabs/Tabs';
// import ArticleList from '../../components/ArticleList/ArticleList';
import { loadAllTags } from '../../services/reducers/profile-reducer';
import { homePageUnload } from '../../services/reducers/home-reducer';
import { changeTab } from '../../services/reducers/articlelist-reducer';
import useTranslate from '../../hooks/useTranslate';

const Home: FC = () => {
  const dispatch = useDispatch();
  const { token, articlesAll, articlesYourFeed } = useSelector((store: any) => ({
    token: store.common.token,
    articlesAll: store.articleList.articles,
    articlesYourFeed: store.articleList.articlesYourFeed,
  }));

  const location = useLocation();
  const localization = useTranslate();
  const isFeed = location.pathname.includes('your-feed');
  const [currentArticles, setCurrentArticles] = useState<any>(articlesAll);
  const articlesCount = currentArticles ? currentArticles.length : 0;

  const onLoad = () => {
    dispatch(loadAllTags({ payload: agent.Tags.getAll() }));
  };
  const onUnload = () => dispatch(homePageUnload());

  useEffect(() => {
    onLoad();
    return () => {
      onUnload();
    };
  }, []);

  /* load articles which needed */
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
    if (isFeed) {
      setCurrentArticles(articlesYourFeed);
    } else {
      setCurrentArticles(articlesAll);
    }
  }, [articlesYourFeed, articlesAll, isFeed]);

  const tabsNames = [
    { name: localization({ page: 'homePage', key: 'tab2Text' }), path: '/' },
    { name: localization({ page: 'homePage', key: 'tab1Text' }), path: '/your-feed' },
  ];

  // {localization({ page: 'homePage', key: 'tab2Text' })}

  const tabsNamesNoAuth = [
    { name: localization({ page: 'homePage', key: 'tab2Text' }), path: '/' },
  ];

  return (
    <div className={styles.home_page}>
      <Banner />
      {token ? (
        <ArticlesWithTabs
          tabsNames={tabsNames}
          articles={currentArticles}
          articlesCount={articlesCount}
        />
      ) : (
        <ArticlesWithTabs
          tabsNames={tabsNamesNoAuth}
          articles={articlesAll}
          articlesCount={articlesCount}
        />
      )}
    </div>
  );
};

export default Home;
