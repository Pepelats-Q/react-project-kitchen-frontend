import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ArticleList from '../../../components/ArticleList/ArticleList';
import agent from '../../../agent';
import { CHANGE_TAB } from '../../../constants/actionTypes';
// import styles from './mainView.module.scss';
import Tabs from '../../../components/Tabs/Tabs';
import tabsStyles from '../../../components/Tabs/Tabs.module.scss';

const mapStateToProps = (state) => ({
  ...state.articleList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (tab, pager, payload) =>
    dispatch({
      type: CHANGE_TAB,
      tab,
      pager,
      payload,
    }),
});

const MainView = (props) => {
  const yourTabClick = (ev) => {
    ev.preventDefault();
    props.onTabClick('feed', agent.Articles.feed, agent.Articles.feed());
  };

  const globalTabClick = (ev) => {
    ev.preventDefault();
    props.onTabClick('all', agent.Articles.all, agent.Articles.all());
  };

  const tab1 = (
    <NavLink
      to='/'
      className={`${tabsStyles.navTab} ${props.tab === 'feed' ? tabsStyles.navTab_active : ''}`}
      onClick={yourTabClick}
    >
      Ваша лента
    </NavLink>
  );

  const tab2 = (
    <NavLink
      to='/'
      className={`${tabsStyles.navTab} ${props.tab === 'all' ? tabsStyles.navTab_active : ''}`}
      onClick={globalTabClick}
    >
      Лента
    </NavLink>
  );

  return (
    <>
      {' '}
      <Tabs tab1={tab1} tab2={tab2} />
      <ArticleList
        articles={props.articles}
        articlesCount={props.articlesCount}
        currentPage={props.currentPage}
        loading={props.loading}
        pager={props.pager}
      />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
