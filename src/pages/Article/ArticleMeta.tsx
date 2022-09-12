import { FC } from 'react';
import ArticleActions from './ArticleActions';
import styles from './Article.module.scss';
import UserWithDate from '../../components/UserWithDate/UserWithDate';
import { TPropsArticle } from '../../utils/typesPages';

const ArticleMeta: FC<TPropsArticle> = ({ article, canModify }) => (
  <div className={styles.meta}>
    <div className={styles.usermeta}>
      <UserWithDate author={article.author} date={article.createdAt} />
    </div>
    <ArticleActions article={article} canModify={canModify} />
  </div>
);

export default ArticleMeta;
