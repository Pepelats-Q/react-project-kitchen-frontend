import { FC, useEffect, useState } from "react";
import agent from "../../agent";
import { useDispatch, useSelector } from "../../hooks/hooks";
// import useTranslate from '../../hooks/useTranslate';
import {
  loadAllArticles,
  setFilteredArticles,
  setTagActive,
} from "../../services/reducers/articlelist-reducer";
import Tag from "./Tag/Tag";
import styles from "./Tags.module.scss";

const Tags: FC<{ tags?: Array<string>; place?: string }> = ({
  tags,
  place,
}) => {
  const dispatch = useDispatch();
  const [currentArticlesToFilter, setCurrentArticlesToFilter] = useState<
    Array<any>
  >([]);

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
  }));

  const filterGivenArticlesByClick = (tag: any) => {
    const shownFilteredArticles = currentArticlesToFilter.filter((article) =>
      article.tagList.includes(tag)
    );
    return shownFilteredArticles;
  };

  const activateTag = (tag: any) => {
    const yourfiltered = filterGivenArticlesByClick(tag);
    dispatch(setFilteredArticles({ tab: currentTab, articles: yourfiltered }));
    dispatch(setTagActive({ tag }));
  };

  const deactivateTag = () => {
    dispatch(loadAllArticles({ payload: agent.Articles.all() }));
  };

  useEffect(() => {
    if (currentTab === "your-posts") {
      setCurrentArticlesToFilter(articlesYourPosts);
    } else if (currentTab === "favorites") {
      setCurrentArticlesToFilter(articlesUserFavorites);
    } else if (currentTab === "feed") {
      setCurrentArticlesToFilter(articlesYourFeed);
    } else {
      setCurrentArticlesToFilter(articlesAll);
    }
  }, [
    currentTab,
    articlesYourPosts,
    articlesUserFavorites,
    articlesYourFeed,
    articlesAll,
  ]);

  const currentTags = (place === "sidebar") ? tabTags : tags;

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
