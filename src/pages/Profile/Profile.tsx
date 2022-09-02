import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.common.currentUser);
  const currentProfile = useSelector((store: any) => store.profile.profile);
  const yourArticles = useSelector((store: any) => store.articleList.articles);
  const articlesFavList = useSelector((store: any) => store.articleList.articlesFavorites);
  const [currentArticles, setCurrentArticles] = useState<any>(yourArticles); // когда добавим тип для статьи, сделаю вместо any: Array<тип статьи>
  const [currentTabFlag, setCurrentTabFlag] = useState<string>('yourPosts');

  const isCurrentUserProfile = user?.username === currentProfile?.username;

  const { username } = useParams<TUsernameParams>();

  const onLoad = (): void => {
    dispatch(getProfile({ payload: agent.Profile.get(username) }));
    dispatch(loadProfileOwnPosts({ payload: agent.Articles.byAuthor(username, 0) }));
    dispatch(loadAllTags({ payload: agent.Tags.getAll() }));
  };

  const onUnload = () => dispatch(profilePageUnload());

  useEffect(() => {
    onLoad();

    return () => {
      onUnload();
    };
  }, [dispatch]);

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

  /* handle tabs behavior: */

  // TODO: Тут с табами перемудрили. Лучше через навлинки сделать
  const onTabClick = (tab: any, type: any, payload: any) => {
    setCurrentTabFlag(tab);
    dispatch(type({ payload }));
  };

  const yourPostsTabClick = () => {
    onTabClick('yourPosts', loadProfileOwnPosts, agent.Articles.byAuthor(username, 0));
  };

  const favPostsTabClick = () => {
    onTabClick(
      'favorites',
      loadProfileFavPosts,
      agent.Articles.favoritedBy(currentProfile.username),
    );
  };

  const currentLang = useSelector((state: any) => state.header.currentLang);
  const { profile } = translations[currentLang];

  const textPosts = isCurrentUserProfile ? profile.yourPosts : profile.usersPosts;
  const tabsNames = [
    { name: textPosts, flag: 'yourPosts' },
    { name: profile.favoritePosts, flag: 'favorites' },
  ];
  const handleClicks = [yourPostsTabClick, favPostsTabClick];

  const articlesCount = currentArticles ? currentArticles.length : 0;

  useEffect(() => {
    if (currentTabFlag === 'yourPosts') {
      setCurrentArticles(yourArticles);
    } else {
      setCurrentArticles(articlesFavList);
    }
  }, [currentTabFlag, yourArticles, articlesFavList]);

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
                {profile.editProfile}
              </NavButton>
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
        <Tabs currentTabFlag={currentTabFlag} handleClicks={handleClicks} tabsNames={tabsNames} />
        <ArticleList articles={currentArticles} articlesCount={articlesCount} />
      </ArticlesWithTabs>
    </div>
  );
};

export default Profile;
