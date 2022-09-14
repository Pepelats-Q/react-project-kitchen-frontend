import { FC } from 'react';
import clsx from 'clsx';
import { useSelector } from '../../hooks/hooks';
import useTranslate from '../../hooks/useTranslate';
import Tags from '../Tags/Tags';
import { TArticle, TNames } from '../../utils/types';
import ArticleList from '../ArticleList/ArticleList';
import Tabs from '../Tabs/Tabs';
import styles from './ArticlesWithTabs.module.scss';

type TArticlesWithTabsProps = {
  tabsNames: Array<TNames>;
  articles: Array<TArticle>;
  articlesCount: number;
};

const ArticlesWithTabs: FC<TArticlesWithTabsProps> = ({ tabsNames, articles, articlesCount }) => {
  const tags = useSelector((store) => store.articleList.tags);
  const localization = useTranslate();

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.children}>
          <Tabs tabsNames={tabsNames} />
          <ArticleList articles={articles} articlesCount={articlesCount} />
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
