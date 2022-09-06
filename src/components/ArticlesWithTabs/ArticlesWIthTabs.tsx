import { FC } from 'react';
import { useDispatch } from 'react-redux';
import useSelector from '../../hooks/hooks';
import useTranslate from '../../hooks/useTranslate';
import Tags from '../../pages/Home/Tags/Tags';
import { applyTagFilter } from '../../services/reducers/articlelist-reducer';
import { TArticlesWithTabsProps } from '../../utils/typesTs';
import ArticleList from '../ArticleList/ArticleList';
import Tabs from '../Tabs/Tabs';
import styles from './ArticlesWithTabs.module.scss';

const ArticlesWithTabs: FC<TArticlesWithTabsProps> = ({ tabsNames, articles, articlesCount }) => {
  const dispatch = useDispatch<any>();

  const { tags } = useSelector((store) => ({
    tags: store.profile.tags,
  }));

  const onClickTag = (tag: any, pager: any, payload: any) => {
    dispatch(applyTagFilter({ tag, pager, payload }));
  };
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
            <p className={styles.title}>{localization({ page: 'common', key: 'tagsTitle' })}</p>
            <Tags onClickTag={onClickTag} tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesWithTabs;
