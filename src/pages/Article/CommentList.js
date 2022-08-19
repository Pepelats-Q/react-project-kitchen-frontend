import Comment from './Comment';

const CommentList = (props) => (
  <div>
    {props.comments.map((comment) => (
      <Comment
        key={comment.id}
        comment={comment}
        currentUser={props.currentUser}
        slug={props.slug}
      />
    ))}
  </div>
);

export default CommentList;
