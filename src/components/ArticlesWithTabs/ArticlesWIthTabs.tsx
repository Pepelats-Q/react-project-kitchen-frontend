import { FC, SyntheticEvent } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from '../../hooks/hooks';
import useTranslate from '../../hooks/useTranslate';
import Tags from '../Tags/Tags';
import { TArticle, TNames } from '../../utils/types';
import ArticleList from '../ArticleList/ArticleList';
import Tabs from '../Tabs/Tabs';
import styles from './ArticlesWithTabs.module.scss';
import TextButton from '../ui-library/Buttons/TextButton/TextButton';
import agent from '../../agent';
import { loadAllArticles } from '../../services/reducers/articlelist-reducer';

type TArticlesWithTabsProps = {
  tabsNames: Array<TNames>;
  articles: Array<TArticle>;
};

const ArticlesWithTabs: FC<TArticlesWithTabsProps> = ({ tabsNames, articles }) => {
  const { activeTag, tags } = useSelector((store) => ({
    activeTag: store.articleList.tag,
    tags: store.articleList.tags,
  }));
  const localization = useTranslate();
  const dispatch = useDispatch();

  const clearTagFilter = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loadAllArticles({ payload: agent.Articles.all() }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.children}>
          <div className={styles.header}>
            <Tabs tabsNames={tabsNames} />
            {activeTag && <TextButton onClick={clearTagFilter}>Сбросить фильтр</TextButton>}
          </div>
          <ArticleList articles={articles} />
        </div>
        <div className={styles.tags}>
          <div className={styles.sidebar}>
            <p className={clsx(styles.title, 'text-default')}>
              {localization({ page: 'common', key: 'tagsTitle' })}
            </p>
            <Tags tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesWithTabs;
