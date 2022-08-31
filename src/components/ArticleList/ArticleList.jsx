import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import translations from '../../constants/translations';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ListPagination from '../ListPagination/ListPagination';
import styles from './articleList.module.scss';

const ArticleList = ({ articles, articlesCount, pager, currentPage }) => {
  const currentLang = useSelector((state) => state.header.currentLang);
  const { common, articlesLang } = translations[currentLang];

  if (!articles) {
    return <div className={styles.article_preview}>{common.loading}</div>;
  }

  if (articles.length === 0) {
    return <div className={styles.article_preview}>{articlesLang.noArticlesMessage}</div>;
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}

      <ListPagination articlesCount={articlesCount} currentPage={currentPage} pager={pager} />
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
