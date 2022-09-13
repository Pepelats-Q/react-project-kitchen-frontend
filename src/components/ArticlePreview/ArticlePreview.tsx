import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import agent from '../../agent';
import styles from './articlePreview.module.scss';
import UserWithDate from '../UserWithDate/UserWithDate';
import { HeartIcon, HeartIconFilled } from '../ui-library/Icons';
import { articleFavorite } from '../../services/reducers/articlelist-reducer';
import useTranslate from '../../hooks/useTranslate';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { TArticle } from '../../utils/types';

type TArticlePreviewProps = {
  article: TArticle;
};

const ArticlePreview: FC<TArticlePreviewProps> = ({ article }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.common.currentUser);
  const areAllHeartsDisabled = !currentUser;
  const localization = useTranslate();

  const favorite = (slug: string) =>
    dispatch(articleFavorite({ payload: agent.Articles.favorite(slug) }));

  const unfavorite = (slug: string) =>
    dispatch(articleFavorite({ payload: agent.Articles.unfavorite(slug) }));

  const handleClickToFavorite = (ev: React.FormEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if (article.favorited) {
      unfavorite(article.slug);
    } else {
      favorite(article.slug);
    }
  };

  const excerpt = article.body.substring(0,250);

  return (
    <div className={styles.article_preview}>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.image} style={{ backgroundImage: `url(${article.link})` }} />
        </div>
        <div className={`${styles.colArticle} ${styles.w100}`}>
          <div className={styles.meta}>
            <UserWithDate author={article.author} date={article.createdAt} />

            <div className={styles.pull_xs_right}>
              <button
                className={`${styles.favouriteButton} ${
                  areAllHeartsDisabled
                    ? styles.favouriteButton_disabled
                    : styles.favouriteButton_enabled
                }`}
                disabled={areAllHeartsDisabled}
                onClick={handleClickToFavorite}
                type='button'
              >
                <p className={`${styles.count} ${article.favorited ? styles.count_added : ''}`}>
                  {article.favoritesCount}
                </p>
                {article.favorited ? (
                  <HeartIconFilled className={styles.heart} color='alert' size='small' />
                ) : (
                  <HeartIcon className={styles.heart} color='primary' size='small' />
                )}
              </button>
            </div>
          </div>

          <Link className={styles.link} to={`/article/${article.slug}`}>
            <h1 className={styles.title}>{article.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: excerpt }} className={styles.text} />
            <span className={styles.continue}>
              {localization({ page: 'articlesLang', key: 'readMore' })}
            </span>
            <ul className={styles.tag_list}>
              {article.tagList.map((tag) => (
                <li key={tag} className={styles.tag_default}>
                  {tag}
                </li>
              ))}
            </ul>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
