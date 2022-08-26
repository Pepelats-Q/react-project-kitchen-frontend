import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import agent from '../../agent';
import ArticleList from '../../components/ArticleList/ArticleList';
import styles from './profile.module.scss';
import tabsStyles from '../../components/Tabs/Tabs.module.scss';

import {
  GET_PROFILE_DATA,
  LOAD_PROFILEOWN_POSTS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  LOAD_ALL_TAGS,
} from '../../constants/actionTypes';
import Button from '../../components/ui-library/Buttons/Button/Button';
import NavButton from '../../components/ui-library/Buttons/NavButton/NavButton';
import { MinusIcon, PlusIcon, GearIcon } from '../../components/ui-library/Icons';
import ArticlesWithTabs from '../../components/ArticlesWithTabs/ArticlesWIthTabs';
import Tabs from '../../components/Tabs/Tabs';

const Profile = ({ children }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.common.currentUser);
  const currentProfile = useSelector((state) => state.profile);
  const theseArticles = useSelector((state) => state.articleList.articles);

  const { username } = useParams();

  useEffect(() => {
    dispatch({ type: GET_PROFILE_DATA, payload: agent.Profile.get(username) });
    dispatch({ type: LOAD_PROFILEOWN_POSTS, payload: agent.Articles.byAuthor(username, 0) });
    dispatch({ type: LOAD_ALL_TAGS, payload: agent.Tags.getAll() });
  }, [username]);

  const isCurrentUserProfile = user?.username === currentProfile?.username;

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
  // <div className={styles.tablist}>

  // const isCurrentUserProfile = user?.username === currentProfile?.username;
  const textPosts = isCurrentUserProfile ? 'Ваши посты' : 'Посты пользователя';

  const tab1Profile = (
    <NavLink
      activeClassName={tabsStyles.navTab_active}
      className={tabsStyles.navTab}
      exact
      to={`/@${currentProfile.username}`}
    >
      {textPosts}
    </NavLink>
  );

  const tab2Profile = (
    <NavLink
      activeClassName={tabsStyles.navTab_active}
      className={tabsStyles.navTab}
      to={`/@${currentProfile.username}/favorites`}
    >
      Любимые посты
    </NavLink>
  );

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
                Редактировать профиль
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
      <ArticlesWithTabs>
        <Tabs tab1={tab1Profile} tab2={tab2Profile} />
        {children || <ArticleList articles={theseArticles} articlesCount={articlesCount1} />}
      </ArticlesWithTabs>
    </div>
  );
};

Profile.propTypes = {
  children: PropTypes.node,
};
export default Profile;
