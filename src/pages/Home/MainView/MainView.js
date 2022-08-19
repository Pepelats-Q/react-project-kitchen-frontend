import { connect } from 'react-redux';
import ArticleList from '../../../components/ArticleList/ArticleList';
import agent from '../../../agent';
import { CHANGE_TAB } from '../../../constants/actionTypes';
import styles from './mainView.module.scss';

const YourFeedTab = (props) => {
  if (props.token) {
    const clickHandler = (ev) => {
      ev.preventDefault();
      props.onTabClick(
        'feed',
        agent.Articles.feed,
        agent.Articles.feed(),
      );
    };

    return (
      <li className='nav-item'>
        <a
          className={
            props.tab === 'feed'
              ? styles.active
              : styles.nav_link
          }
          href='/'
          onClick={clickHandler}
        >
          Ваша лента
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = (props) => {
  const clickHandler = (ev) => {
    ev.preventDefault();
    props.onTabClick(
      'all',
      agent.Articles.all,
      agent.Articles.all(),
    );
  };
  return (
    <li className='nav-item'>
      <a
        className={
          props.tab === 'all'
            ? styles.active
            : styles.nav_link
        }
        href='/'
        onClick={clickHandler}
      >
        Лента
      </a>
    </li>
  );
};

const TagFilterTab = (props) => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className='nav-item'>
      <a
        className={styles.active}
        href='src/components/Pages/Home/MainView/MainView'
      >
        <i className='ion-pound' /> {props.tag}
      </a>
    </li>
  );
};

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

const MainView = (props) => (
  <div className={styles.col_md_9}>
    <div className={styles.feed_toggle}>
      <ul className={`${styles.nav} ${styles.nav_pills}`}>
        <YourFeedTab
          onTabClick={props.onTabClick}
          tab={props.tab}
          token={props.token}
        />

        <GlobalFeedTab
          onTabClick={props.onTabClick}
          tab={props.tab}
        />

        <TagFilterTab tag={props.tag} />
      </ul>
    </div>

    <ArticleList
      articles={props.articles}
      articlesCount={props.articlesCount}
      currentPage={props.currentPage}
      loading={props.loading}
      pager={props.pager}
    />
  </div>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainView);
