import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import agent from '../../agent';
import ArticleList from '../../components/ArticleList/ArticleList';
import Profile from './Profile';

import { LOAD_PROFILEFAV_POSTS } from '../../constants/actionTypes';

const ProfileFavorites = () => {
  const profile = useSelector((state) => state.profile);
  const articlesFavList = useSelector((state) => state.articleList.articlesFavorites);
  const articlesCount1 = articlesFavList ? articlesFavList.length : 0;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_PROFILEFAV_POSTS,
      payload: agent.Articles.favoritedBy(profile.username),
    });
  }, [profile]);

  return (
    <Profile>
      <ArticleList articles={articlesFavList} articlesCount={articlesCount1} />
    </Profile>
  );
};

export default ProfileFavorites;
