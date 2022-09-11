import { FC } from 'react';
import ArticleActions from './ArticleActions';
import styles from './Article.module.scss';
import UserWithDate from '../../components/UserWithDate/UserWithDate';
import { TArticle } from '../../utils/typesTs';

const ArticleMeta: FC<{article: TArticle; canModify: boolean;}> = ({ article, canModify }) => (
  <div className={styles.meta}>
    <div className={styles.usermeta}>
      <UserWithDate author={article.author} date={article.createdAt} />
    </div>
    <ArticleActions article={article} canModify={canModify} />
  </div>
);

export default ArticleMeta;
