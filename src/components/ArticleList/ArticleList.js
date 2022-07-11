import React from 'react';
import PropTypes from 'prop-types';
// import styleArticleList from './ArticleList.module.scss';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ListPagination from '../ListPagination/ListPagination';

const ArticleList = ({
  articles, articlesCount, pager, currentPage,
}) => {
  if (!articles) {
    return <div className='article-preview'>Загрузка...</div>;
  }

  if (articles.length === 0) {
    return <div className='article-preview'>Нет статей...</div>;
  }

  return (
    <div>
      {articles.map((article) => (
        <ArticlePreview article={article} key={article.slug} />
      ))}

      <ListPagination pager={pager} articlesCount={articlesCount} currentPage={currentPage} />
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
