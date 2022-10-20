import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import agent from '../../agent';
import Button from '../ui-library/Buttons/Button/Button';
import styles from './Comment.module.scss';
import { addComment } from '../../services/reducers/article-reducer';
import useTranslate from '../../hooks/useTranslate';
import { useSelector } from '../../hooks/hooks';
import { TPropsWithSlug } from '../../utils/types';
import ListErrors from '../ListErrors/ListErrors';

const CommentInput: FC<TPropsWithSlug> = ({ slug }) => {
  const { currentUser, currentProfile, errorsStore } = useSelector((store) => ({
    currentUser: store.common.currentUser,
    currentProfile: store.profile.profile,
    errorsStore: store.auth.errors,
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

  const [errorText, setErrorText] = useState('');

  const createComment = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    if (state.body !== '') {
      const payload = agent.Comments.create(slug, { body: state.body });
      setState({ body: '' });
      onSubmit(payload);
    } else {
      setErrorText(localization({ page: 'comments', key: 'emptyAlert' }));
      setTimeout(() => {
        setErrorText('');
      }, 2500);
    }
  };

  return (
    <div className={styles.input_container}>
      <div className={styles.errors_container}>
        <ListErrors errors={errorsStore} />
        <p className={styles.comment_error}>{errorText}</p>
      </div>
      <div className={`${styles.comment} ${styles.comment_input}`}>
        <form className={styles.commentForm} onSubmit={createComment}>
          <textarea
            className={styles.textarea}
            onChange={setBody}
            placeholder={localization({ page: 'comments', key: 'writeComment' })}
            rows={3}
            value={state.body}
          />
          <div className={styles.commentUser}>
            <div className={styles.userInfo}>
              <img
                alt={currentUser.username}
                className={styles.userImage}
                src={currentProfile.image}
              />
              <div className={styles.info}>
                <p className={styles.userLink}>{currentUser.username}</p>
              </div>
            </div>
            <Button onClick={createComment}>
              {localization({ page: 'comments', key: 'post' })}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

CommentInput.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default CommentInput;
