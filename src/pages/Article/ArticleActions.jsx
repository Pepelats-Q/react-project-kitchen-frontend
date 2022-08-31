import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import agent from '../../agent';
import { DELETE_ARTICLE } from '../../constants/actionTypes';
import Button from '../../components/ui-library/Buttons/Button/Button';
import { EditIcon, TrashIcon } from '../../components/ui-library/Icons';
import styles from './Article.module.scss';
import NavButton from '../../components/ui-library/Buttons/NavButton/NavButton';

const ArticleActions = ({ article, canModify }) => {
  const dispatch = useDispatch();

  const onClickDelete = (payload) => dispatch({ type: DELETE_ARTICLE, payload });

  const del = () => {
    onClickDelete(agent.Articles.del(article.slug));
  };
  if (canModify) {
    return (
      <div className={styles.actions}>
        <NavButton
          to={`/editor/${article.slug}`}
          type='primary'
          icon={<EditIcon size='small' />}
          className={styles.action}
        >
          Edit Article
        </NavButton>
        <Button onClick={del} type='outline_alert' icon={<TrashIcon />} className={styles.action}>
          Delete Article
        </Button>
      </div>
    );
  }

  return <span />;
};

ArticleActions.propTypes = {
  article: PropTypes.object.isRequired,
  canModify: PropTypes.bool.isRequired,
};

export default ArticleActions;
