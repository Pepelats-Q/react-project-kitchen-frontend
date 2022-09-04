import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentInput from './CommentInput';
import styles from './Comment.module.scss';
import translations from '../../constants/translations';
import Comment from './CommentCard';

const CommentContainer = ({ slug }) => {
  const { currentUser, currentLang, comments } = useSelector((store) => ({
    currentUser: store.common.currentUser,
    currentLang: store.header.currentLang,
    comments: store.article.comments,
  }));

  const { articlesLang } = translations[currentLang];

  return (
    <div className={styles.commentsContainer}>
      <h2 className={styles.commentsTitle}>{articlesLang.comments.comments}</h2>
      {currentUser ? (
        <div className={`${styles.comment} ${styles.comment_input}`}>
          {/* позже с этим буду разбираться  <ListErrors errors={errors} /> */}
          <CommentInput currentUser={currentUser} slug={slug} />
        </div>
      ) : (
        <div className={styles.commentPar}>
          <Link className={styles.userLink} to='/login'>
            {articlesLang.comments.signIn}
          </Link>
          &nbsp;{articlesLang.comments.or}&nbsp;
          <Link className={styles.userLink} to='/register'>
            {articlesLang.comments.signUp}
          </Link>
          {articlesLang.comments.signInText}
        </div>
      )}
      <ul className={styles.commentsList}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} slug={slug} />
        ))}
      </ul>
    </div>
  );
};

CommentContainer.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CommentContainer;
