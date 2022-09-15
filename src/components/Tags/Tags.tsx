import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import agent from '../../agent';
import { useDispatch, useSelector } from '../../hooks/hooks';
// import useTranslate from '../../hooks/useTranslate';
import {
  changeTab,
  setFilteredArticles,
  setTagActive,
  setTagDeactive,
} from '../../services/reducers/articlelist-reducer';
import { TUsernameParams } from '../../utils/types';
import Tag from './Tag/Tag';
import styles from './Tags.module.scss';

const Tags: FC<{ tags?: Array<string>; place?: string }> = ({ tags, place }) => {
  const dispatch = useDispatch();
  const [currentArticlesToFilter, setCurrentArticlesToFilter] = useState<Array<any>>([]);

  const {
    articlesYourPosts,
    articlesUserFavorites,
    articlesAll,
    articlesYourFeed,
    activeTag,
    currentTab,
    tabTags,
    currentProfile,
  } = useSelector((store) => ({
    articlesYourPosts: store.articleList.articlesProfileYourPosts,
    articlesUserFavorites: store.articleList.articlesProfileFavorites,
    articlesAll: store.articleList.articles,
    articlesYourFeed: store.articleList.articlesYourFeed,
    activeTag: store.articleList.tag,
    currentTab: store.articleList.tab,
    tabTags: store.articleList.currentTags,
    currentProfile: store.profile.profile,
  }));
  const { username } = useParams<TUsernameParams>();

  const filterGivenArticlesByClick = (tag: any) => {
    const shownFilteredArticles = currentArticlesToFilter.filter((article) =>
      article.tagList.includes(tag),
    );
    return shownFilteredArticles;
  };

  const activateTag = (tag: any) => {
    const yourfiltered = filterGivenArticlesByClick(tag);
    dispatch(setFilteredArticles({ tab: currentTab, articles: yourfiltered }));
    dispatch(setTagActive({ tag }));
  };

  const makeTagUnactive = () => {
    dispatch(setTagDeactive());
    if (currentTab === 'your-posts') {
      dispatch(
        changeTab({
          tab: 'your-posts',
          pager: agent.Articles.byAuthor,
          payload: agent.Articles.byAuthor(username, 0),
        }),
      );
    } else if (currentTab === 'favorites') {
      dispatch(
        changeTab({
          tab: 'favorites',
          pager: agent.Articles.favoritedBy,
          payload: agent.Articles.favoritedBy(currentProfile.username),
        }),
      );
    } else if (currentTab === 'feed') {
      dispatch(
        changeTab({ tab: 'feed', pager: agent.Articles.feed, payload: agent.Articles.feed() }),
      );
    } else {
      dispatch(changeTab({ tab: 'all', pager: agent.Articles.all, payload: agent.Articles.all() }));
    }
  };

  const deactivateTag = () => {
    makeTagUnactive();
  };

  useEffect(() => {
    if (currentTab === 'your-posts') {
      setCurrentArticlesToFilter(articlesYourPosts);
    } else if (currentTab === 'favorites') {
      setCurrentArticlesToFilter(articlesUserFavorites);
    } else if (currentTab === 'feed') {
      setCurrentArticlesToFilter(articlesYourFeed);
    } else {
      setCurrentArticlesToFilter(articlesAll);
    }
  }, [currentTab, articlesYourPosts, articlesUserFavorites, articlesYourFeed, articlesAll]);

  const currentTags = place === 'sidebar' ? tabTags : tags;

  if (currentTags) {
    return (
      <div className={styles.tag_list}>
        {currentTags.map((tag) => {
          const handleClick = () => {
            if (tag === activeTag) {
              deactivateTag();
            } else {
              activateTag(tag);
            }
          };
          return <Tag key={tag} handleClick={handleClick} tag={tag} />;
        })}
      </div>
    );
  }

  return <div>Пока у этих статей нет тегов</div>;
};

export default Tags;
