import { FC } from 'react';
import useTranslate from '../../hooks/useTranslate';
import { TArticleList } from '../../utils/typesComponentProps';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ListPagination from '../ListPagination/ListPagination';
import styles from './articleList.module.scss';

const ArticleList: FC<TArticleList> = ({ articles, articlesCount, pager, currentPage }) => {
  const localization = useTranslate();

  if (!articles) {
    return (
      <div className={styles.article_preview}>
        {localization({ page: 'common', key: 'loading' })}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className={styles.article_preview}>
        {localization({ page: 'articlesLang', key: 'noArticlesMessage' })}
      </div>
    );
  }

  return (
    <div className={styles.box}>
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}

      <ListPagination articlesCount={articlesCount} currentPage={currentPage} pager={pager} />
    </div>
  );
};

export default ArticleList;
