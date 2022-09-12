import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import agent from '../../agent';
import styles from './profile.module.scss';
import Button from '../../components/ui-library/Buttons/Button/Button';
import NavButton from '../../components/ui-library/Buttons/NavButton/NavButton';
import { MinusIcon, PlusIcon, GearIcon } from '../../components/ui-library/Icons';
import ArticlesWithTabs from '../../components/ArticlesWithTabs/ArticlesWIthTabs';
import { TUsernameParams } from '../../utils/typesTs';
import {
  followUser,
  getProfile,
  loadAllTags,
  profilePageUnload,
  unFollowUser,
} from '../../services/reducers/profile-reducer';
import { logout } from '../../services/reducers/common-reducer';
import {
  changeTab,
  profileClearArticlesPageUnloaded,
} from '../../services/reducers/articlelist-reducer';
import useTranslate from '../../hooks/useTranslate';
import { useDispatch, useSelector } from '../../hooks/hooks';

const Profile: FC = () => {
  // TODO: тут пока оставила store any, буду с типами статей чуть позже разбираться
  const { currentProfile, user, articlesUserPosts, articlesUserFavorites } = useSelector(
    (store: any) => ({
      currentProfile: store.profile.profile,
      user: store.common.currentUser,
      articlesUserPosts: store.articleList.articlesProfileYourPosts,
      articlesUserFavorites: store.articleList.articlesProfileFavorites,
    }),
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const localization = useTranslate();
  const { username } = useParams<TUsernameParams>();
  const articlesCount = 0;
  const isCurrentUserProfile = user?.username === currentProfile?.username;
  const isFavorite = location.pathname.includes('favorite');
  const [currentArticles, setCurrentArticles] = useState([]);

  const onLoad = (): void => {
    dispatch(getProfile({ payload: agent.Profile.get(username) }));
    dispatch(loadAllTags({ payload: agent.Tags.getAll() }));
  };

  const onUnload = () => {
    dispatch(profilePageUnload());
    dispatch(profileClearArticlesPageUnloaded());
  };

  useEffect(() => {
    onLoad();
    return () => {
      onUnload();
    };
  }, [username]);

  const loadFavorites = () => {
    dispatch(
      changeTab({
        tab: 'favorites',
        pager: agent.Articles.favoritedBy,
        payload: agent.Articles.favoritedBy(currentProfile.username),
      }),
    );
  };

  const loadYourPosts = () => {
    dispatch(
      changeTab({
        tab: 'your-posts',
        pager: agent.Articles.byAuthor,
        payload: agent.Articles.byAuthor(username, 0),
      }),
    );
  };

  useEffect(() => {
    if (isFavorite) {
      loadFavorites();
    } else {
      loadYourPosts();
    }
  }, [user, currentProfile, isFavorite]);

  useEffect(() => {
    if (isFavorite) {
      setCurrentArticles(articlesUserFavorites);
    } else {
      setCurrentArticles(articlesUserPosts);
    }
  }, [articlesUserFavorites, articlesUserPosts]);

  const textPosts = isCurrentUserProfile
    ? localization({ page: 'profile', key: 'yourPosts' })
    : localization({ page: 'profile', key: 'usersPosts' });
  const tabsNames = [
    { name: textPosts, path: `/@${username}` },
    {
      name: localization({ page: 'profile', key: 'favoritePosts' }),
      path: `/@${username}/favorites`,
    },
  ];

  const onFollow = () => {
    dispatch(followUser({ payload: agent.Profile.follow(username) }));
  };

  const onUnfollow = () => {
    dispatch(unFollowUser({ payload: agent.Profile.unfollow(username) }));
  };

  const handleFollowClick = (ev: SyntheticEvent) => {
    ev.preventDefault();
    if (currentProfile.following) {
      onUnfollow();
    } else {
      onFollow();
    }
  };

  const onClickLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

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
            {isCurrentUserProfile ? (
              <div className={styles.actions}>
                <NavButton icon={<GearIcon />} to='/settings' type='primary'>
                  {localization({ page: 'profile', key: 'editProfile' })}
                </NavButton>
                <Button onClick={onClickLogout} type='outline_alert'>
                  {localization({ page: 'settings', key: 'logout' })}
                </Button>
              </div>
            ) : (
              ''
            )}

            {!isCurrentUserProfile && user ? (
              <Button
                icon={currentProfile.following ? <MinusIcon /> : <PlusIcon />}
                onClick={handleFollowClick}
                type='primary'
              >
                {currentProfile.following
                  ? localization({ page: 'profile', key: 'unsubscribe' })
                  : localization({ page: 'profile', key: 'subscribe' })}
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <ArticlesWithTabs
        articles={currentArticles}
        articlesCount={articlesCount}
        tabsNames={tabsNames}
      />
    </div>
  );
};

export default Profile;
