import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import agent from '../../agent';
import ArticleList from '../../components/ArticleList/ArticleList';
import styles from './profile.module.scss';
import Button from '../../components/ui-library/Buttons/Button/Button';
import NavButton from '../../components/ui-library/Buttons/NavButton/NavButton';
import { MinusIcon, PlusIcon, GearIcon } from '../../components/ui-library/Icons';
import ArticlesWithTabs from '../../components/ArticlesWithTabs/ArticlesWIthTabs';
import Tabs from '../../components/Tabs/Tabs';
import { TUsernameParams } from '../../utils/typesTs';
import translations from '../../constants/translations';
import {
  followUser,
  getProfile,
  loadAllTags,
  profilePageUnload,
  unFollowUser,
} from '../../services/reducers/profile-reducer';
import {
  loadProfileFavPosts,
  loadProfileOwnPosts,
} from '../../services/reducers/articlelist-reducer';
import { logout } from '../../services/reducers/common-reducer';

const Profile: FC = () => {
  const { articlesFavList, currentLang, currentProfile, user, yourArticles } = useSelector(
    (store: any) => ({
      articlesFavList: store.articleList.articlesFavorites,
      currentLang: store.header.currentLang,
      currentProfile: store.profile.profile,
      user: store.common.currentUser,
      yourArticles: store.articleList.articles,
    }),
  );
  const history = useHistory();
  const dispatch = useDispatch();
  const { username } = useParams<TUsernameParams>();

  const [currentArticles, setCurrentArticles] = useState<any>(yourArticles); // когда добавим тип для статьи, сделаю вместо any: Array<тип статьи>
  const isCurrentUserProfile = user?.username === currentProfile?.username;
  const { profile, settings } = translations[currentLang];
  const textPosts = isCurrentUserProfile ? profile.yourPosts : profile.usersPosts;
  const tabsNames = [
    { name: textPosts, flag: 'yourPosts', path: `/@${username}` },
    { name: profile.favoritePosts, flag: 'favorites', path: `/@${username}/favorites` },
  ];
  const articlesCount = currentArticles ? currentArticles.length : 0;
  const location = useLocation();
  const isFavorite = location.pathname.includes('favorite');

  const onLoad = (): void => {
    dispatch(getProfile({ payload: agent.Profile.get(username) }));
    dispatch(loadAllTags({ payload: agent.Tags.getAll() }));
  };

  const onUnload = () => dispatch(profilePageUnload());

  useEffect(() => {
    onLoad();
    return () => {
      onUnload();
    };
  }, [dispatch, location]);

  useEffect(() => {
    if (isFavorite) {
      dispatch(
        loadProfileFavPosts({ payload: agent.Articles.favoritedBy(currentProfile.username) }),
      );
    } else {
      dispatch(loadProfileOwnPosts({ payload: agent.Articles.byAuthor(username, 0) }));
    }
  }, [currentProfile, isFavorite]);

  useEffect(() => {
    if (isFavorite) {
      setCurrentArticles(articlesFavList);
    } else {
      setCurrentArticles(yourArticles);
    }
  }, [yourArticles, articlesFavList, isFavorite]);

  /* handle follow behavior: */
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
                  {profile.editProfile}
                </NavButton>
                <Button onClick={onClickLogout} type='outline_alert'>
                  {settings.logout}
                </Button>
              </div>
            ) : (
              ''
            )}

            {/* Запрещаю подписку на себя */}
            {!isCurrentUserProfile && user ? (
              <Button
                icon={currentProfile.following ? <MinusIcon /> : <PlusIcon />}
                onClick={handleFollowClick}
                type='primary'
              >
                {currentProfile.following ? profile.unsubscribe : profile.subscribe}
              </Button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <ArticlesWithTabs>
        <Tabs tabsNames={tabsNames} />
        <ArticleList articles={currentArticles} articlesCount={articlesCount} />
      </ArticlesWithTabs>
    </div>
  );
};

export default Profile;
