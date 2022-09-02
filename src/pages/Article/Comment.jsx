import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import styles from './Article.module.scss';
import UserWithDate from '../../components/UserWithDate/UserWithDate';

// TODO: Надо перенести в components
const Comment = ({ comment, slug }) => {
  const currentUser = useSelector((state) => state.common.currentUser);

  const show = currentUser && currentUser.username === comment.author.username;
  return (
    <li className={styles.comment}>
      <p className={styles.commentPar}>{comment.body}</p>

      <div className={styles.commentUser}>
        <div className={styles.userInfo}>
          <UserWithDate author={comment.author} date={comment.createdAt} />
        </div>

        <DeleteButton commentId={comment.id} show={show} slug={slug} />
      </div>
    </li>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  slug: PropTypes.string.isRequired,
};

export default Comment;
