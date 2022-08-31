import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import agent from '../../agent';
import Button from '../../components/ui-library/Buttons/Button/Button';
import { ADD_COMMENT } from '../../constants/actionTypes';
import styles from './Article.module.scss';

const CommentInput = ({ slug }) => {
  const dispatch = useDispatch();

  const onSubmit = (payload) => {
    dispatch({ type: ADD_COMMENT, payload });
  };

  const currentUser = useSelector((state) => state.common.currentUser);
  const currentProfile = useSelector((state) => state.profile);

  const [state, setState] = useState({ body: '' });

  const setBody = (ev) => {
    setState({ body: ev.target.value });
  };

  const createComment = (ev) => {
    ev.preventDefault();
    const payload = agent.Comments.create(slug, { body: state.body });
    setState({ body: '' });
    onSubmit(payload);
  };

  return (
    <form className={styles.commentForm} onSubmit={createComment}>
      <textarea
        className={styles.textarea}
        onChange={setBody}
        placeholder='Write a comment...'
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
        <Button onClick={createComment}>Post Comment</Button>
      </div>
    </form>
  );
};

CommentInput.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CommentInput;
