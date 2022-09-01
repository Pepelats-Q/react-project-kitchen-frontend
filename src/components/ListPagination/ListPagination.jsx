import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import agent from '../../agent';
import { SET_PAGE } from '../../constants/actionTypes';

const mapDispatchToProps = (dispatch) => ({
  onSetPage: (page, payload) => dispatch({ type: SET_PAGE, page, payload }),
});

const ListPagination = ({ articlesCount, pager, onSetPage, currentPage }) => {
  if (articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(articlesCount / 10); i += 1) {
    range.push(i);
  }

  const setPage = (page) => {
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
          const onClick = (ev) => {
            ev.preventDefault();
            setPage(v);
          };
          return (
            <li
              key={v.toString()}
              className={isCurrent ? 'page-item active' : 'page-item'}
              onClick={onClick}
            >
              <a className='page-link' href='/'>
                {v + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

ListPagination.propTypes = {
  articlesCount: PropTypes.number,
  pager: PropTypes.func,
  onSetPage: PropTypes.func,
  currentPage: PropTypes.number,
};

export default connect(() => ({}), mapDispatchToProps)(ListPagination);
