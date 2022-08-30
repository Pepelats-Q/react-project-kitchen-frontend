import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import agent from '../../agent';
import ArticleList from '../../components/ArticleList/ArticleList';
import styles from './profile.module.scss';

import {
  GET_PROFILE_DATA,
  LOAD_PROFILEOWN_POSTS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  LOAD_ALL_TAGS,
  LOAD_PROFILEFAV_POSTS,
  PROFILE_PAGE_UNLOADED,
} from '../../constants/actionTypes';
import Button from '../../components/ui-library/Buttons/Button/Button';
import NavButton from '../../components/ui-library/Buttons/NavButton/NavButton';
import { MinusIcon, PlusIcon, GearIcon } from '../../components/ui-library/Icons';
import ArticlesWithTabs from '../../components/ArticlesWithTabs/ArticlesWIthTabs';
import Tabs from '../../components/Tabs/Tabs';
import { TUsernameParams } from '../../utils/typesTs';
import translations from '../../constants/translations';

const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.common.currentUser);
  const currentProfile = useSelector((state: any) => state.profile);
  const yourArticles = useSelector((state: any) => state.articleList.articles);
  const articlesFavList = useSelector((state: any) => state.articleList.articlesFavorites);
  const [currentArticles, setCurrentArticles] = useState<any>(yourArticles); // когда добавим тип для статьи, сделаю вместо any: Array<тип статьи>
  const [currentTabFlag, setCurrentTabFlag] = useState<string>('yourPosts');

  const isCurrentUserProfile = user?.username === currentProfile?.username;

  const { username } = useParams<TUsernameParams>();

  const onLoad = (): void => {
    dispatch({ type: GET_PROFILE_DATA, payload: agent.Profile.get(username) });
    dispatch({ type: LOAD_PROFILEOWN_POSTS, payload: agent.Articles.byAuthor(username, 0) });
    dispatch({ type: LOAD_ALL_TAGS, payload: agent.Tags.getAll() });
  };

  const onUnload = () => dispatch({ type: PROFILE_PAGE_UNLOADED });

  useEffect(() => {
    onLoad();

    return () => {
      onUnload();
    };
  }, [dispatch]);

  /* handle follow behavior: */
  const onFollow = () => {
    dispatch({ type: FOLLOW_USER, payload: agent.Profile.follow(username) });
  };

  const onUnfollow = () => {
    dispatch({ type: UNFOLLOW_USER, payload: agent.Profile.unfollow(username) });
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

  const onTabClick = (tab: any, type: any, payload: any) => {
    setCurrentTabFlag(tab);
    dispatch({
      type,
      payload,
    });
  };

  const yourPostsTabClick = () => {
    onTabClick('yourPosts', LOAD_PROFILEOWN_POSTS, agent.Articles.byAuthor(username, 0));
  };

  const favPostsTabClick = () => {
    onTabClick(
      'favorites',
      LOAD_PROFILEFAV_POSTS,
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
            {!isCurrentUserProfile ? (
              <Button
                icon={currentProfile.following ? <MinusIcon /> : <PlusIcon />}
                onClick={handleFollowClick}
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
        <Tabs currentTabFlag={currentTabFlag} handleClicks={handleClicks} tabsNames={tabsNames} />
        <ArticleList articles={currentArticles} articlesCount={articlesCount} />
      </ArticlesWithTabs>
    </div>
  );
};

export default Profile;
