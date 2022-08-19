import { Link } from 'react-router-dom';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

const CommentContainer = (props) => {
  if (props.currentUser) {
    return (
      <div className='col-xs-12 col-md-8 offset-md-2'>
        <div>
          <list-errors errors={props.errors} />
          <CommentInput
            currentUser={props.currentUser}
            slug={props.slug}
          />
        </div>

        <CommentList
          comments={props.comments}
          currentUser={props.currentUser}
          slug={props.slug}
        />
      </div>
    );
  }
  return (
    <div className='col-xs-12 col-md-8 offset-md-2'>
      <p>
        <Link to='/login'>Sign in</Link>
        &nbsp;or&nbsp;
        <Link to='/register'>sign up</Link>
        &nbsp;to add comments on this article.
      </p>

      <CommentList
        comments={props.comments}
        currentUser={props.currentUser}
        slug={props.slug}
      />
    </div>
  );
};

export default CommentContainer;
