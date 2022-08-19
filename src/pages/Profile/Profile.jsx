import { useEffect } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import agent from '../../agent';
import ArticleList from '../../components/ArticleList/ArticleList';
import styles from './profile.module.scss';

import {
  GET_PROFILE_DATA,
  LOAD_PROFILEOWN_POSTS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  APPLY_TAG_FILTER,
  LOAD_ALL_TAGS,
} from '../../constants/actionTypes';
import Button from '../../components/ui-library/Buttons/Button/Button';
import NavButton from '../../components/ui-library/Buttons/NavButton/NavButton';
import { MinusIcon, PlusIcon, GearIcon } from '../../components/ui-library/Icons';
import Tags from '../Home/Tags/Tags';

const Profile = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const locationIsFavorites = location.pathname.includes('favorites');

  const user = useSelector((state) => state.common.currentUser);
  const currentProfile = useSelector((state) => state.profile);
  const theseArticles = useSelector((state) => state.articleList.articles);
  const tags = useSelector((state) => state.profile.tags);

  const { username } = useParams();

  useEffect(() => {
    dispatch({ type: GET_PROFILE_DATA, payload: agent.Profile.get(username) });
    dispatch({ type: LOAD_PROFILEOWN_POSTS, payload: agent.Articles.byAuthor(username, 0) });
    dispatch({ type: LOAD_ALL_TAGS, payload: agent.Tags.getAll() });
  }, [username]);

  const isCurrentUserProfile = user?.username === currentProfile?.username;

  const textPosts = isCurrentUserProfile ? 'Ваши посты' : 'Посты пользователя';

  const tabs = (
    <ul className={styles.tabsList}>
      <li className={`${styles.navItem} ${locationIsFavorites ? '' : styles.navItem_active}`}>
        <NavLink
          activeClassName={styles.navTab_active}
          className={styles.navTab}
          exact
          to={`/@${currentProfile.username}`}
        >
          {textPosts}
        </NavLink>
      </li>

      <li className={`${styles.navItem} ${locationIsFavorites ? styles.navItem_active : ''}`}>
        <NavLink
          activeClassName={styles.navTab_active}
          className={styles.navTab}
          to={`/@${currentProfile.username}/favorites`}
        >
          Любимые посты
        </NavLink>
      </li>
    </ul>
  );

  const onClickTag = (tag, pager, payload) => {
    dispatch({
      type: APPLY_TAG_FILTER,
      tag,
      pager,
      payload,
    });
  };

  const onFollow = () => {
    dispatch({ type: FOLLOW_USER, payload: agent.Profile.follow(username) });
  };

  const onUnfollow = () => {
    dispatch({ type: UNFOLLOW_USER, payload: agent.Profile.unfollow(username) });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    if (currentProfile.following) {
      onUnfollow();
    } else {
      onFollow();
    }
  };

  const articlesCount1 = theseArticles ? theseArticles.length : 0;
  return (
    <div className={styles.page}>
      <div className={styles.userinfo}>
        <div className={styles.container}>
          <div className={styles.box}>
            <img
              alt={currentProfile.username}
              className={styles.image}
              src={currentProfile.image}
            />
            <h2 className={styles.name}>{currentProfile.username}</h2>
          </div>
          <div className={styles.section}>
            <p className={styles.bio}>{currentProfile.bio}</p>
          </div>
          <div className={styles.button}>
            {/* Кнопка редактирования профиля не показывается, если это чужой профиль */}
            {isCurrentUserProfile ? (
              <NavButton icon={<GearIcon />} to='/settings' type='primary'>
                Изменить настройки профиля
              </NavButton>
            ) : (
              ''
            )}

            {/* Запрещаю подписку на себя */}
            {!isCurrentUserProfile ? (
              <Button
                icon={currentProfile.following ? <MinusIcon /> : <PlusIcon />}
                onClick={handleClick}
                type='primary'
              >
                {currentProfile.following ? ' Отменить подписку' : ' Подписаться'}
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.articlesSection}>
          <div className={styles.tablist}>
            <div className='articles-toggle'>{tabs}</div>
            {props.children ? (
              props.children
            ) : (
              <ArticleList articles={theseArticles} articlesCount={articlesCount1} />
            )}
          </div>
          <div className={styles.tags}>
            <div className={styles.sidebar}>
              <p className={styles.title1}>Популярные теги</p>
              <Tags onClickTag={onClickTag} tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
