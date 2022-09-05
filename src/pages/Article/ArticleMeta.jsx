import PropTypes from 'prop-types';
import ArticleActions from './ArticleActions';
import styles from './Article.module.scss';
import UserWithDate from '../../components/UserWithDate/UserWithDate';

const ArticleMeta = ({ article, canModify }) => (
  <div className={styles.meta}>
    <div className={styles.usermeta}>
      <UserWithDate author={article.author} date={article.createdAt} />
    </div>
    <ArticleActions article={article} canModify={canModify} />
  </div>
);

ArticleMeta.propTypes = {
  article: PropTypes.object.isRequired,
  canModify: PropTypes.bool,
};

export default ArticleMeta;
