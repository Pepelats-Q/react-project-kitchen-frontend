import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../hooks/hooks';
import useTranslate from '../../hooks/useTranslate';
import {
  setFilteredArticles,
  setTagActive,
  setTagDeactive,
} from '../../services/reducers/articlelist-reducer';
import Tag from './Tag/Tag';
import styles from './Tags.module.scss';

const Tags: FC<{ tags?: Array<string>; place?: string }> = ({ tags, place }) => {
  const dispatch = useDispatch();
  const [currentArticlesToFilter, setCurrentArticlesToFilter] = useState<Array<any>>([]);
  const localization = useTranslate();

  const {
    articlesYourPosts,
    articlesUserFavorites,
    articlesAll,
    articlesYourFeed,
    activeTag,
    currentTab,
    tabTags,
  } = useSelector((store) => ({
    articlesYourPosts: store.articleList.articlesProfileYourPosts,
    articlesUserFavorites: store.articleList.articlesProfileFavorites,
    articlesAll: store.articleList.articles,
    articlesYourFeed: store.articleList.articlesYourFeed,
    activeTag: store.articleList.tag,
    currentTab: store.articleList.tab,
    tabTags: store.articleList.currentTags,
    currentProfile: store.profile.profile,
    filterActivated: store.articleList.filterActivated,
  }));

  const filterGivenArticlesByClick = (tag: any) =>
    currentArticlesToFilter.filter((article) => article.tagList.includes(tag));

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

  const deactivateTag = () => {
    dispatch(setTagDeactive());
  };

  const activateTag = (tag: any) => {
    deactivateTag();
    dispatch(setTagActive({ tag }));
    const filtered = filterGivenArticlesByClick(tag);
    dispatch(setFilteredArticles({ tab: currentTab, articles: filtered }));
  };

  const isSidebar = place === 'sidebar';
  const currentTags = isSidebar ? tabTags : tags;

  const noTags = isSidebar ? (
    <div className={styles.message}>{localization({ page: 'articlesLang', key: 'noTags' })}</div>
  ) : (
    <div />
  );

  if (currentTags && currentTags.length > 0) {
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
          return place !== 'article' ? (
            <Tag key={tag} handleClick={handleClick} tag={tag} />
          ) : (
            <Tag key={tag} tag={tag} />
          );
        })}
      </div>
    );
  }
  return noTags;
};

export default Tags;
