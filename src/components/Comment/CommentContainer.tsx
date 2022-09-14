import { FC } from 'react';
import { Link } from 'react-router-dom';
import CommentInput from './CommentInput';
import styles from './Comment.module.scss';
import Comment from './CommentCard';
import useTranslate from '../../hooks/useTranslate';
import { useSelector } from '../../hooks/hooks';
import ListErrors from '../ListErrors/ListErrors';
import { TPropsWithSlug } from '../../utils/types';

const CommentContainer: FC<TPropsWithSlug> = ({ slug }) => {
  const { currentUser, comments, errorsStore } = useSelector((store) => ({
    currentUser: store.common.currentUser,
    comments: store.article.comments || [],
    errorsStore: store.auth.errors,
  }));
  const localization = useTranslate();
  // console.log('comments:', comments);

  return (
    <div className={styles.commentsContainer}>
      <h2 className={styles.commentsTitle}>
        {localization({ page: 'comments', key: 'comments' })}
      </h2>
      {currentUser ? (
        <div className={`${styles.comment} ${styles.comment_input}`}>
          <ListErrors errors={errorsStore} />
          <CommentInput slug={slug} />
        </div>
      ) : (
        <div className={styles.commentPar}>
          <Link className={styles.userLink} to='/login'>
            {localization({ page: 'comments', key: 'signIn' })}
          </Link>
          &nbsp;{localization({ page: 'comments', key: 'or' })}&nbsp;
          <Link className={styles.userLink} to='/register'>
            {localization({ page: 'comments', key: 'signUp' })}
          </Link>
          {localization({ page: 'comments', key: 'signInText' })}
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

export default CommentContainer;
