import PropTypes from 'prop-types';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ListPagination from '../ListPagination/ListPagination';
import styles from './articleList.module.scss';

const ArticleList = ({
  articles,
  articlesCount,
  pager,
  currentPage,
}) => {
  if (!articles) {
    return (
      <div className={styles.article_preview}>
        Загрузка...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className={styles.article_preview}>
        Нет статей...
      </div>
    );
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticlePreview
          key={article.slug}
          article={article}
        />
      ))}

      <ListPagination
        articlesCount={articlesCount}
        currentPage={currentPage}
        pager={pager}
      />
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.any),
  articlesCount: PropTypes.number,
  pager: PropTypes.func,
  currentPage: PropTypes.number,
};

export default ArticleList;
