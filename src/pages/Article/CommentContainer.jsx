import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import styles from './Article.module.scss';
import ListErrors from '../../components/ListErrors/ListErrors';

const CommentContainer = ({ errors, slug }) => {
  const currentUser = useSelector((state) => state.common.currentUser);

  if (currentUser) {
    return (
      <div className={styles.commentsContainer}>
        <h2 className={styles.commentsTitle}>Комментарии</h2>
        <div className={styles.comment}>
          <ListErrors errors={errors} />
          <CommentInput currentUser={currentUser} slug={slug} />
        </div>

        <CommentList slug={slug} />
      </div>
    );
  }
  return (
    <div className={styles.commentPar}>
      <p>
        <Link to='/login' className={styles.userLink}>
          Sign in
        </Link>
        &nbsp;or&nbsp;
        <Link to='/register' className={styles.userLink}>
          sign up
        </Link>
        &nbsp;to add comments on this article.
      </p>

      <CommentList slug={slug} />
    </div>
  );
};

CommentContainer.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  slug: PropTypes.string.isRequired,
};

export default CommentContainer;
