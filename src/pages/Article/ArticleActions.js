import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../../agent';
import { DELETE_ARTICLE } from '../../constants/actionTypes';

const mapDispatchToProps = (dispatch) => ({
  onClickDelete: (payload) =>
    dispatch({ type: DELETE_ARTICLE, payload }),
});

const ArticleActions = (props) => {
  const { article } = props;
  const del = () => {
    props.onClickDelete(agent.Articles.del(article.slug));
  };
  if (props.canModify) {
    return (
      <span>
        <Link
          className='btn btn-outline-secondary btn-sm'
          to={`/editor/${article.slug}`}
        >
          <i className='ion-edit' /> Edit Article
        </Link>

        <button
          className='btn btn-outline-danger btn-sm'
          onClick={del}
          type='button'
        >
          <i className='ion-trash-a' /> Delete Article
        </button>
      </span>
    );
  }

  return <span />;
};

export default connect(
  () => ({}),
  mapDispatchToProps,
)(ArticleActions);
