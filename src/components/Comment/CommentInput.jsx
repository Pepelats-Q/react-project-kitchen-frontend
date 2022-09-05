import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import agent from '../../agent';
import Button from '../ui-library/Buttons/Button/Button';
import styles from './Comment.module.scss';
import translations from '../../constants/translations';
import { addComment } from '../../services/reducers/article-reducer';

const CommentInput = ({ slug }) => {
  const { currentUser, currentProfile, currentLang } = useSelector((state) => ({
    currentUser: state.common.currentUser,
    currentProfile: state.profile.profile,
    currentLang: state.header.currentLang,
  }));
  const { comments } = translations[currentLang].articlesLang;
  const [state, setState] = useState({ body: '' });

  const dispatch = useDispatch();

  const setBody = (ev) => {
    setState({ body: ev.target.value });
  };

  const onSubmit = (payload) => {
    dispatch(addComment({ payload }));
  };

  const createComment = (ev) => {
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
        placeholder={comments.writeComment}
        rows='3'
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
        <Button onClick={createComment}>{comments.post}</Button>
      </div>
    </form>
  );
};

CommentInput.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CommentInput;
