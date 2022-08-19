import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import agent from '../../agent';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../../constants/actionTypes';
import styles from './articlePreview.module.scss';
import avatar from '../../images/avatarTemp.svg';

const FAVORITED_CLASS = `${styles.btn} ${styles.btn_sm} ${styles.btn_primary}`;
const NOT_FAVORITED_CLASS = `${styles.btn} ${styles.btn_sm} ${styles.btn_outline_primary}`;

const mapDispatchToProps = (dispatch) => ({
  favorite: (slug) =>
    dispatch({
      type: ARTICLE_FAVORITED,
      payload: agent.Articles.favorite(slug),
    }),
  unfavorite: (slug) =>
    dispatch({
      type: ARTICLE_UNFAVORITED,
      payload: agent.Articles.unfavorite(slug),
    }),
});

const ArticlePreview = ({ article, favorite, unfavorite }) => {
  const favoriteButtonClass = article.favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;

  const handleClick = (ev) => {
    ev.preventDefault();
    if (article.favorited) {
      unfavorite(article.slug);
    } else {
      favorite(article.slug);
    }
  };

  const defaultAvatar = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  return (
    <div className={styles.article_preview}>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.image} />
        </div>
        <div className={`${styles.col} ${styles.w100}`}>
          <div className={styles.article_meta}>
            <Link className={styles.avatar} to={`/@${article.author.username}`}>
              {article.author.image === defaultAvatar ? (
                <img alt={article.author.username} src={avatar} />
              ) : (
                <img alt={article.author.username} src={article.author.image} />
              )}
            </Link>

            <div className={styles.info}>
              <Link className={styles.author} to={`/@${article.author.username}`}>
                {article.author.username}
              </Link>
              <span className={styles.date}>
                {new Intl.DateTimeFormat('ru', {
                  weekday: 'short',
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                }).format(new Date(article.createdAt))}
              </span>
            </div>

            <div className={styles.pull_xs_right}>
              <button className={favoriteButtonClass} onClick={handleClick} type='button'>
                {article.favoritesCount}
                <i className='ion-heart offset-sm-6' />
              </button>
            </div>
          </div>

          <Link className='preview-link' to={`/article/${article.slug}`}>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.text}>{article.description}</p>
            <span className={styles.continue}>Читать продолжение...</span>
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
  unfavorite: PropTypes.func,
  favorite: PropTypes.func,
};

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
