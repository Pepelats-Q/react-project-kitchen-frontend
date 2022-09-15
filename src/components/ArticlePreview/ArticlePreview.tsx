import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import agent from '../../agent';
import styles from './articlePreview.module.scss';
import UserWithDate from '../UserWithDate/UserWithDate';
import { HeartIcon, HeartIconFilled } from '../ui-library/Icons';
import { articleFavorite } from '../../services/reducers/articlelist-reducer';
import useTranslate from '../../hooks/useTranslate';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { TArticle } from '../../utils/types';
import Tags from '../Tags/Tags';

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

  return (
    <div className={styles.article_preview}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Link className={styles.link} to={`/article/${article.slug}`}>
            <div className={styles.image} style={{ backgroundImage: `url(${article.link})` }} />
          </Link>
        </div>
        <div className={styles.colArticle}>
          <div className={styles.meta}>
            <UserWithDate author={article.author} date={article.createdAt} />
            <div className={styles.pull_xs_right}>
              <button
                className={clsx(
                  styles.favouriteButton,
                  areAllHeartsDisabled
                    ? styles.favouriteButton_disabled
                    : styles.favouriteButton_enabled,
                )}
                disabled={areAllHeartsDisabled}
                onClick={handleClickToFavorite}
                type='button'
              >
                <p className={clsx(styles.count, article.favorited ? styles.count_added : '')}>
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
            <p className={clsx(styles.description, 'text-default')} title={article.description}>
              {article.description}
            </p>

            <div className={styles.preview_footer}>
              <span className={clsx(styles.readmore, 'text-default')}>
                {localization({ page: 'articlesLang', key: 'readMore' })}
              </span>
              <Tags tags={article.tagList} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlePreview;
