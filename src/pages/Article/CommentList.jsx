import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Comment from './Comment';
import styles from './Article.module.scss';

const CommentList = ({ slug }) => {
  const comments = useSelector((state) => state.article.comments);

  return (
    <ul className={styles.commentsList}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} slug={slug} />
      ))}
    </ul>
  );
};

Comment.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CommentList;
