import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ slug }) => {
  const comments = useSelector((state) => state.article.comments);

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} slug={slug} />
      ))}
    </div>
  );
};

Comment.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CommentList;
