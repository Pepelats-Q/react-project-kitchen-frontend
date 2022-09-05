import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import agent from '../../agent';
import styles from './articlePreview.module.scss';

import translations from '../../constants/translations';
import UserWithDate from '../UserWithDate/UserWithDate';
import { HeartIcon, HeartIconFilled } from '../ui-library/Icons';
import { articleFavorite } from '../../services/reducers/articlelist-reducer';

const ArticlePreview = ({ article }) => {
  const dispatch = useDispatch();
  const { currentLang, currentUser } = useSelector((store) => ({
    currentLang: store.header.currentLang,
    currentUser: store.common.currentUser,
  }));
  const { articlesLang } = translations[currentLang];

  const favorite = (slug) => dispatch(articleFavorite({ payload: agent.Articles.favorite(slug) }));

  const unfavorite = (slug) =>
    dispatch(articleFavorite({ payload: agent.Articles.unfavorite(slug) }));

  const handleClickToFavorite = (ev) => {
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
          <div className={styles.image} style={{ backgroundImage: `url(${article.link})` }} />
        </div>
        <div className={`${styles.colArticle} ${styles.w100}`}>
          <div className={styles.article_meta}>
            <UserWithDate author={article.author} date={article.createdAt} />

            <div className={styles.pull_xs_right}>
              <button
                className={styles.favouriteButton}
                disabled={!currentUser}
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
            <p className={styles.text}>{article.description}</p>
            <span className={styles.continue}>{articlesLang.readMore}</span>
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

ArticlePreview.propTypes = {
  article: PropTypes.object,
};

export default ArticlePreview;
