import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import styles from './Article.module.scss';
import translations from '../../constants/translations';

const CommentContainer = ({ slug }) => {
  const currentUser = useSelector((state) => state.common.currentUser);
  const currentLang = useSelector((state) => state.header.currentLang);
  const { comments } = translations[currentLang].articlesLang;

  if (currentUser) {
    return (
      <div className={styles.commentsContainer}>
        <h2 className={styles.commentsTitle}>{comments.comments}</h2>
        <div className={`${styles.comment} ${styles.comment_input}`}>
          {/* позже с этим буду разбираться  <ListErrors errors={errors} /> */}
          <CommentInput currentUser={currentUser} slug={slug} />
        </div>

        <CommentList slug={slug} />
      </div>
    );
  }

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.commentPar}>
        <p>
          <Link to='/login' className={styles.userLink}>
            {comments.signIn}
          </Link>
          &nbsp;{comments.or}&nbsp;
          <Link to='/register' className={styles.userLink}>
            {comments.signUp}
          </Link>
          {comments.signInText}
        </p>

        <CommentList slug={slug} />
      </div>
    </div>
  );
};

CommentContainer.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CommentContainer;
