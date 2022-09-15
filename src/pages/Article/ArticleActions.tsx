import { FC } from 'react';
import agent from '../../agent';
import Button from '../../components/ui-library/Buttons/Button/Button';
import { EditIcon, TrashIcon } from '../../components/ui-library/Icons';
import styles from './Article.module.scss';
import NavButton from '../../components/ui-library/Buttons/NavButton/NavButton';
import { articleDelete } from '../../services/reducers/common-reducer';
import useTranslate from '../../hooks/useTranslate';
import { useDispatch } from '../../hooks/hooks';
import { TArticle } from '../../utils/types';

type TArticleProps = { article: TArticle; canModify: boolean };

const ArticleActions: FC<TArticleProps> = ({ article, canModify }) => {
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
          className={`${styles.action} ${styles.action_delete}`}
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

export default ArticleActions;
