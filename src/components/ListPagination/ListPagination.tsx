import React, { FC } from 'react';
import clsx from 'clsx';
import agent from '../../agent';
import { setPageAction } from '../../services/reducers/articlelist-reducer';
import { useDispatch, useSelector } from '../../hooks/hooks';
import styles from './ListPagination.module.scss';

type TListPaginationProps = {
  pager: any;
};

const ListPagination: FC<TListPaginationProps> = ({ pager }) => {
  const dispatch = useDispatch();
  const { articlesCount, currentPage } = useSelector((store) => ({
    articlesCount: store.articleList.articlesCount,
    currentPage: store.articleList.currentPage,
  }));

  const onSetPage = (page: any, payload: any) => dispatch(setPageAction({ page, payload }));

  if (articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(articlesCount / 10); i += 1) {
    range.push(i);
  }

  const setPage = (page: any) => {
    if (pager) {
      onSetPage(page, pager(page));
    } else {
      onSetPage(page, agent.Articles.all(page));
    }
  };

  return (
    <nav className={styles.wrapper}>
      <div className={styles.pagination}>
        {range.map((v) => {
          const isCurrent = v === currentPage;
          const onClick = (ev: React.SyntheticEvent) => {
            ev.preventDefault();
            setPage(v);
          };
          return (
            <button
              key={v.toString()}
              className={clsx(styles.page_button, 'text-default', isCurrent ? styles.active : '')}
              onClick={onClick}
              type='button'
            >
              {v + 1}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ListPagination;
