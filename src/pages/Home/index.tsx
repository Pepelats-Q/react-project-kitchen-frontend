import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Banner from './Banner/Banner';
import agent from '../../agent';
import styles from './home.module.scss';
import ArticlesWithTabs from '../../components/ArticlesWithTabs/ArticlesWIthTabs';
import Tabs from '../../components/Tabs/Tabs';
import ArticleList from '../../components/ArticleList/ArticleList';
import translations from '../../constants/translations';
import { loadAllTags } from '../../services/reducers/profile-reducer';
import { homePageLoad, homePageUnload } from '../../services/reducers/home-reducer';
import { changeTab } from '../../services/reducers/articlelist-reducer';

const Home: FC = () => {
  const dispatch = useDispatch();
  const { token, appName, articles, currentLang } = useSelector((state: any) => ({
    token: state.common.token,
    appName: state.common.appName,
    articles: state.articleList.articles,
    currentLang: state.header.currentLang,
  }));

  const { homePage } = translations[currentLang];
  const location = useLocation();
  const isFeed = location.pathname.includes('your-feed');

  const onLoad = (tab: string, pager: any, payload: any) => {
    dispatch(homePageLoad({ tab, pager, payload }));
    dispatch(loadAllTags({ payload: agent.Tags.getAll() }));
  };

  const onUnload = () => dispatch(homePageUnload());

  useEffect(() => {
    const tab = isFeed ? 'feed' : 'all';
    const articlesPromise = agent.Articles.all;
    onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
    return () => {
      onUnload();
    };
  }, []);

  const onTabChange = (tab: string, pager: any, payload: any) => {
    dispatch(changeTab({ pager, payload }));
  };

  const loadYourFeed = () => {
    onTabChange('feed', agent.Articles.feed, agent.Articles.feed());
  };

  const loadGlobalFeed = () => {
    onTabChange('all', agent.Articles.all, agent.Articles.all());
  };

  useEffect(() => {
    if (isFeed) {
      loadYourFeed();
    } else {
      loadGlobalFeed();
    }
  }, [isFeed]);

  const tabsNames = [
    { name: homePage.tab2Text, path: '/' },
    { name: homePage.tab1Text, path: '/your-feed' },
  ];

  const articlesCount = articles ? articles.length : 0;

  const tabsNamesNoAuth = [{ name: homePage.tab2Text, path: '/' }];

  return (
    <div className={styles.home_page}>
      <Banner appName={appName} />
      {token ? (
        <ArticlesWithTabs>
          <Tabs tabsNames={tabsNames} />
          <ArticleList articles={articles} articlesCount={articlesCount} />
        </ArticlesWithTabs>
      ) : (
        <ArticlesWithTabs>
          <Tabs tabsNames={tabsNamesNoAuth} />
          <ArticleList articles={articles} articlesCount={articlesCount} />
        </ArticlesWithTabs>
      )}
    </div>
  );
};

export default Home;
