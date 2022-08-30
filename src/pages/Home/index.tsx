import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Banner from './Banner/Banner';
import agent from '../../agent';
import {
  CHANGE_TAB,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  LOAD_ALL_TAGS,
} from '../../constants/actionTypes';
import styles from './home.module.scss';
import ArticlesWithTabs from '../../components/ArticlesWithTabs/ArticlesWIthTabs';
import Tabs from '../../components/Tabs/Tabs';
import ArticleList from '../../components/ArticleList/ArticleList';
import translations from '../../constants/translations';

const { Promise } = global;

const Home: FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.common.token);
  const appName = useSelector((state: any) => state.common.appName);
  const articles = useSelector((state: any) => state.articleList.articles);
  const [currentTabFlag, setCurrentTabFlag] = useState<string>('feedPosts');

  const onLoad = (tab: string, pager: any, payload: any) => {
    dispatch({
      type: HOME_PAGE_LOADED,
      tab,
      pager,
      payload,
    });
    dispatch({ type: LOAD_ALL_TAGS, payload: agent.Tags.getAll() });
  };

  const onUnload = () => dispatch({ type: HOME_PAGE_UNLOADED });

  useEffect(() => {
    const tab = token ? 'feed' : 'all';
    const articlesPromise = token ? agent.Articles.feed : agent.Articles.all;
    onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
    return () => {
      onUnload();
    };
  }, []);

  /* handle tabs behavior: */
  const onTabClick = (tab: string, pager: any, payload: any) => {
    setCurrentTabFlag(tab);
    dispatch({
      type: CHANGE_TAB,
      tab,
      pager,
      payload,
    });
  };

  const yourTabClick = () => {
    onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
  };

  const globalTabClick = () => {
    onTabClick('all', agent.Articles.all, agent.Articles.all());
  };

  const currentLang = useSelector((state: any) => state.header.currentLang);
  const { homePage } = translations[currentLang];

  const tabsNames = [
    { name: homePage.tab1Text, flag: 'feedPosts' },
    { name: homePage.tab2Text, flag: 'allPosts' },
  ];
  const handleClicks = [yourTabClick, globalTabClick];

  const articlesCount = articles ? articles.length : 0;

  return (
    <div className={styles.home_page}>
      <Banner appName={appName} />
      <ArticlesWithTabs>
        <Tabs currentTabFlag={currentTabFlag} handleClicks={handleClicks} tabsNames={tabsNames} />
        <ArticleList articles={articles} articlesCount={articlesCount} />
      </ArticlesWithTabs>
    </div>
  );
};

export default Home;
