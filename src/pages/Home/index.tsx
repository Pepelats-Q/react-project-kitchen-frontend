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
} from '../../services/reducers/articlelist-reducer';
import useTranslate from '../../hooks/useTranslate';
import { useDispatch, useSelector } from '../../hooks/hooks';

const Home: FC = () => {
  const dispatch = useDispatch();
  const { token, articlesAll, articlesYourFeed } = useSelector((store) => ({
    token: store.common.token,
    articlesAll: store.articleList.articles,
    articlesYourFeed: store.articleList.articlesYourFeed,
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
    // собирает теги с одной страницы
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

  const [currentHomeTags, setCurrentHomeTags] = useState<Array<any>>([]);

  useEffect(() => {
    if (isFeed) {
      setCurrentArticles(articlesYourFeed);
      setCurrentHomeTags(defineThisTabTags(articlesYourFeed));
    } else {
      setCurrentArticles(articlesAll);
      setCurrentHomeTags(defineThisTabTags(articlesAll));
    }
  }, [articlesYourFeed, articlesAll, isFeed]);

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
        <ArticlesWithTabs articles={currentArticles} tabsNames={tabsNames} tags={currentHomeTags} />
      ) : (
        <ArticlesWithTabs
          articles={articlesAll}
          tabsNames={tabsNamesNoAuth}
          tags={currentHomeTags}
        />
      )}
    </div>
  );
};

export default Home;
