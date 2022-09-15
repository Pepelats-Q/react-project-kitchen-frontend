import { FC, SyntheticEvent } from 'react';
import clsx from 'clsx';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from '../../hooks/hooks';
import useTranslate from '../../hooks/useTranslate';
import Tags from '../Tags/Tags';
import { TArticle, TNames, TUsernameParams } from '../../utils/types';
import ArticleList from '../ArticleList/ArticleList';
import Tabs from '../Tabs/Tabs';
import styles from './ArticlesWithTabs.module.scss';
import TextButton from '../ui-library/Buttons/TextButton/TextButton';
import agent from '../../agent';
import { changeTab, setTagDeactive } from '../../services/reducers/articlelist-reducer';

type TArticlesWithTabsProps = {
  tabsNames: Array<TNames>;
  articles: Array<TArticle>;
};

const ArticlesWithTabs: FC<TArticlesWithTabsProps> = ({ tabsNames, articles }) => {
  const localization = useTranslate();
  const dispatch = useDispatch();
  const { activeTag, currentTab, currentProfile } = useSelector((store) => ({
    activeTag: store.articleList.tag,
    currentTab: store.articleList.tab,
    currentProfile: store.profile.profile,
  }));
  const { username } = useParams<TUsernameParams>();

  const makeTagUnactive = () => {
    dispatch(setTagDeactive());
    if (currentTab === 'your-posts') {
      dispatch(
        changeTab({
          tab: 'your-posts',
          pager: agent.Articles.byAuthor,
          payload: agent.Articles.byAuthor(username, 0),
        }),
      );
    } else if (currentTab === 'favorites') {
      dispatch(
        changeTab({
          tab: 'favorites',
          pager: agent.Articles.favoritedBy,
          payload: agent.Articles.favoritedBy(currentProfile.username),
        }),
      );
    } else if (currentTab === 'feed') {
      dispatch(
        changeTab({ tab: 'feed', pager: agent.Articles.feed, payload: agent.Articles.feed() }),
      );
    } else {
      dispatch(changeTab({ tab: 'all', pager: agent.Articles.all, payload: agent.Articles.all() }));
    }
  };

  const clearTagFilter = (e: SyntheticEvent) => {
    e.preventDefault();
    makeTagUnactive();
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.children}>
          <div className={styles.header}>
            <Tabs tabsNames={tabsNames} />
            {activeTag && <TextButton onClick={clearTagFilter}>{localization({page: 'articlesLang', key: 'filterreset'})}</TextButton>}
          </div>
          <ArticleList articles={articles} />
        </div>
        <div className={styles.tags}>
          <div className={styles.sidebar}>
            <p className={clsx(styles.title, 'text-default')}>
              {localization({ page: 'common', key: 'tagsTitle' })}
            </p>
            <Tags place='sidebar' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesWithTabs;
