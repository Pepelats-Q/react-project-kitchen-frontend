import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import styles from './Article.module.scss';

const Comment = ({ comment, slug }) => {
  const currentUser = useSelector((state) => state.common.currentUser);

  const show = currentUser && currentUser.username === comment.author.username;
  return (
    <div className={styles.comment}>
      <p className={styles.commentPar}>{comment.body}</p>

      <div className={styles.commentUser}>
        <div className={styles.userInfo}>
          <Link to={`/@${comment.author.username}`}>
            <img
              alt={comment.author.username}
              className={styles.userImage}
              src={comment.author.image}
            />
          </Link>
          <div className={styles.info}>
            <Link to={`/@${comment.author.username}`} className={styles.userLink}>
              {comment.author.username}
            </Link>
            <span className={styles.date}>{new Date(comment.createdAt).toDateString()}</span>
          </div>
        </div>

        <DeleteButton commentId={comment.id} show={show} slug={slug} />
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Comment;
