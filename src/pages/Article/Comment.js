import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';

const Comment = (props) => {
  const { comment } = props;
  const show =
    props.currentUser &&
    props.currentUser.username === comment.author.username;
  return (
    <div className='card'>
      <div className='card-block'>
        <p className='card-text'>{comment.body}</p>
      </div>
      <div className='card-footer'>
        <Link
          className='comment-author'
          to={`/@${comment.author.username}`}
        >
          <img
            alt={comment.author.username}
            className='comment-author-img'
            src={comment.author.image}
          />
        </Link>
        &nbsp;
        <Link
          className='comment-author'
          to={`/@${comment.author.username}`}
        >
          {comment.author.username}
        </Link>
        <span className='date-posted'>
          {new Date(comment.createdAt).toDateString()}
        </span>
        <DeleteButton
          commentId={comment.id}
          show={show}
          slug={props.slug}
        />
      </div>
    </div>
  );
};

export default Comment;
