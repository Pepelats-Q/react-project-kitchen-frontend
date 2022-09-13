import React, { FC } from 'react';
import agent from '../../agent';
import { setPageAction } from '../../services/reducers/articlelist-reducer';
import { useDispatch } from '../../hooks/hooks';

type TListPaginationProps = {
  articlesCount: number;
  pager: any;
  currentPage: any;
};

const ListPagination: FC<TListPaginationProps> = ({ articlesCount, pager, currentPage }) => {
  const dispatch = useDispatch();

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
    <nav>
      <ul className='pagination'>
        {range.map((v) => {
          const isCurrent = v === currentPage;
          const onClick = (ev: React.SyntheticEvent) => {
            ev.preventDefault();
            setPage(v);
          };
          return (
            <li key={v.toString()}>
              <button
                className={isCurrent ? 'page-item active' : 'page-item'}
                onClick={onClick}
                type='button'
              >
                {v + 1}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ListPagination;
