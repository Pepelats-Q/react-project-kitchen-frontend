import { FC } from 'react';
import styles from './Comment.module.scss';
import UserWithDate from '../UserWithDate/UserWithDate';
import { TrashIcon } from '../ui-library/Icons';
import { deleteComment } from '../../services/reducers/article-reducer';
import agent from '../../agent';
import { useDispatch, useSelector } from '../../hooks/hooks';

type TCommentCardProps = {
  comment: {
    author: {
      username: string;
      image: string;
      following: boolean;
    };
    id: string;
    body: string;
    createdAt: string;
  };
  slug: string;
};

const Comment: FC<TCommentCardProps> = ({ comment, slug }) => {
  const currentUser = useSelector((state) => state.common.currentUser);
  const show = currentUser && currentUser.username === comment.author.username;

  const dispatch = useDispatch();

  const deleteCommentHandler = () => {
    const payload = agent.Comments.delete(slug, comment.id);
    dispatch(deleteComment({ payload, commentId: comment.id }));
  };

  return (
    <li className={styles.comment}>
      <p className={styles.commentPar}>{comment.body}</p>

      <div className={styles.commentUser}>
        <div className={styles.userInfo}>
          <UserWithDate author={comment.author} date={comment.createdAt} />
        </div>
        {show && <TrashIcon color='alert' onClick={deleteCommentHandler} size='small' />}
      </div>
    </li>
  );
};

export default Comment;
