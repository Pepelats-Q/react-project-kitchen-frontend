import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import agent from '../../agent';
import Button from '../../components/ui-library/Buttons/Button/Button';
import { EditIcon, TrashIcon } from '../../components/ui-library/Icons';
import styles from './Article.module.scss';
import NavButton from '../../components/ui-library/Buttons/NavButton/NavButton';
import { articleDelete } from '../../services/reducers/common-reducer';
import useTranslate from '../../hooks/useTranslate';

const ArticleActions = ({ article, canModify }) => {
  const localization = useTranslate();
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    dispatch(articleDelete({ payload: agent.Articles.del(article.slug) }));
  };
  if (canModify) {
    return (
      <div className={styles.actions}>
        <NavButton
          className={styles.action}
          icon={<EditIcon size='small' />}
          to={`/editor/${article.slug}`}
          type='primary'
        >
          {localization({ page: 'articlesLang', key: 'edit' })}
        </NavButton>
        <Button
          className={styles.action}
          icon={<TrashIcon />}
          onClick={onDeleteHandler}
          type='outline_alert'
        >
          {localization({ page: 'articlesLang', key: 'delete' })}
        </Button>
      </div>
    );
  }

  return <span />;
};

ArticleActions.propTypes = {
  article: PropTypes.object.isRequired,
  canModify: PropTypes.bool,
};

export default ArticleActions;
