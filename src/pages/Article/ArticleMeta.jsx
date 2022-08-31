import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArticleActions from './ArticleActions';
import styles from './Article.module.scss';

const ArticleMeta = ({ article, canModify }) => (
  <div className={styles.meta}>
    <div className={styles.usermeta}>
      <Link to={`/@${article.author.username}`}>
        <img
          alt={article.author.username}
          src={article.author.image}
          className={styles.userImage}
        />
      </Link>

      <div className={styles.info}>
        <Link className={styles.userLink} to={`/@${article.author.username}`}>
          {article.author.username}
        </Link>
        <span className={styles.date}>{new Date(article.createdAt).toDateString()}</span>
      </div>
    </div>

    <ArticleActions article={article} canModify={canModify} />
  </div>
);

ArticleMeta.propTypes = {
  article: PropTypes.object.isRequired,
  canModify: PropTypes.bool,
};

export default ArticleMeta;
