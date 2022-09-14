import { FC } from 'react';
import useTranslate from '../../hooks/useTranslate';
import { TArticle } from '../../utils/types';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
import ListPagination from '../ListPagination/ListPagination';
import styles from './articleList.module.scss';

type TArticleListProps = {
  articles: Array<TArticle>;
  articlesCount: number;
  pager?: () => void;
  currentPage?: number;
};

const ArticleList: FC<TArticleListProps> = ({ articles, articlesCount, pager, currentPage }) => {
  const localization = useTranslate();

  if (!articles) {
    return (
      <div className={styles.box}>
        <div className={styles.article_preview}>
          {localization({ page: 'common', key: 'loading' })}
        </div>
      </div>
    );
  }
  if (articles.length === 0) {
    return (
      <div className={styles.box}>
        <div className={styles.article_preview}>
          {localization({ page: 'articlesLang', key: 'noArticlesMessage' })}
        </div>
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
