import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APPLY_TAG_FILTER } from '../../constants/actionTypes';
import Tags from '../../pages/Home/Tags/Tags';
import styles from './ArticlesWithTabs.module.scss';

type TArticlesWithTabsProps = {
  children: React.ReactNode;
};

const ArticlesWithTabs: FC<TArticlesWithTabsProps> = ({ children }) => {
  const dispatch = useDispatch<any>();
  const tags = useSelector((state: any) => state.profile.tags);

  const onClickTag = (tag: any, pager: any, payload: any) => {
    dispatch({
      type: APPLY_TAG_FILTER,
      tag,
      pager,
      payload,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.children}>{children}</div>
        <div className={styles.tags}>
          <div className={styles.sidebar}>
            <p className={styles.title}>Популярные теги</p>
            <Tags onClickTag={onClickTag} tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesWithTabs;
