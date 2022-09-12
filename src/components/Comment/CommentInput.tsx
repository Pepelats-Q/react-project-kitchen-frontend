import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import agent from '../../agent';
import Button from '../ui-library/Buttons/Button/Button';
import styles from './Comment.module.scss';
import { addComment } from '../../services/reducers/article-reducer';
import useTranslate from '../../hooks/useTranslate';
import { useSelector } from '../../hooks/hooks';

const CommentInput: FC<{ slug: string }> = ({ slug }) => {
  const { currentUser, currentProfile } = useSelector((state) => ({
    currentUser: state.common.currentUser,
    currentProfile: state.profile.profile,
  }));
  const [state, setState] = useState({ body: '' });
  const localization = useTranslate();

  const dispatch = useDispatch();

  const setBody = (ev: React.SyntheticEvent) => {
    const target = ev.target as HTMLTextAreaElement;
    setState({ body: target.value });
  };

  const onSubmit = (payload: any) => {
    dispatch(addComment({ payload }));
  };

  const createComment = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    const payload = agent.Comments.create(slug, { body: state.body });
    setState({ body: '' });
    onSubmit(payload);
  };

  return (
    <form className={styles.commentForm} onSubmit={createComment}>
      {/* TODO: Надо добавить кастомный скролл в проект */}
      <textarea
        className={styles.textarea}
        onChange={setBody}
        placeholder={localization({ page: 'comments', key: 'writeComment' })}
        rows={3}
        value={state.body}
      />
      <div className={styles.commentUser}>
        <div className={styles.userInfo}>
          <img alt={currentUser.username} className={styles.userImage} src={currentProfile.image} />
          <div className={styles.info}>
            <p className={styles.userLink}>{currentUser.username}</p>
          </div>
        </div>
        {/* TODO: У кнопки свойство cursor после обновления слетает на default  */}
        {/* у кнопки Button в ховере прописала cursor: pointer, теперь не слетает. Надо еще протестировать  */}
        <Button onClick={createComment}>{localization({ page: 'comments', key: 'post' })}</Button>
      </div>
    </form>
  );
};

CommentInput.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CommentInput;
