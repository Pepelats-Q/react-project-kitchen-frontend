import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const { Promise } = global;

const Home: FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.common.token);
  const appName = useSelector((state: any) => state.common.appName);
  const articles = useSelector((state: any) => state.articleList.articles);
  const [currentTabFlag, setCurrentTabFlag] = useState<string>('allPosts');

  const onLoad = (tab: string, pager: any, payload: any) => {
    dispatch(homePageLoad({ tab, pager, payload }));
    dispatch(loadAllTags({ payload: agent.Tags.getAll() }));
  };

  const onUnload = () => dispatch(homePageUnload());

  useEffect(() => {
    const tab = token ? 'feed' : 'all';
    const articlesPromise = agent.Articles.all;
    onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]));
    return () => {
      onUnload();
    };
  }, []);

  /* handle tabs behavior: */
  // TODO: С табами перемудрили
  const onTabClick = (tab: string, pager: any, payload: any) => {
    setCurrentTabFlag(tab);
    dispatch(changeTab({ tab, pager, payload }));
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
    { name: homePage.tab2Text, flag: 'allPosts' },
    { name: homePage.tab1Text, flag: 'feedPosts' },
  ];
  const handleClicks = [globalTabClick, yourTabClick];

  const articlesCount = articles ? articles.length : 0;

  const tabsNamesNoAuth = [{ name: homePage.tab2Text, flag: 'allPosts' }];
  const handleClicksNoAuth = [globalTabClick];

  return (
    <div className={styles.home_page}>
      <Banner appName={appName} />
      {token ? (
        <ArticlesWithTabs>
          <Tabs currentTabFlag={currentTabFlag} handleClicks={handleClicks} tabsNames={tabsNames} />
          <ArticleList articles={articles} articlesCount={articlesCount} />
        </ArticlesWithTabs>
      ) : (
        <ArticlesWithTabs>
          <Tabs
            currentTabFlag='allPosts'
            handleClicks={handleClicksNoAuth}
            tabsNames={tabsNamesNoAuth}
          />
          <ArticleList articles={articles} articlesCount={articlesCount} />
        </ArticlesWithTabs>
      )}
    </div>
  );
};

export default Home;
