import { FC, useEffect, useState } from 'react';
import agent from '../../agent';
import { useDispatch, useSelector } from '../../hooks/hooks';
// import useTranslate from '../../hooks/useTranslate';
import { loadAllArticles, setFilteredArticles } from '../../services/reducers/articlelist-reducer';
import Tag from './Tag/Tag';
import styles from './Tags.module.scss';

const Tags: FC<{ tags: Array<string> }> = ({ tags }) => {
  const dispatch = useDispatch();
  const [currentArticlesToFilter, setCurrentArticlesToFilter] = useState<Array<any>>([]);

  const {
    articlesYourPosts,
    articlesUserFavorites,
    articlesAll,
    articlesYourFeed,
    activeTag,
    currentTab,
  } = useSelector((store) => ({
    articlesYourPosts: store.articleList.articlesProfileYourPosts,
    articlesUserFavorites: store.articleList.articlesProfileFavorites,
    articlesAll: store.articleList.articles,
    articlesYourFeed: store.articleList.articlesYourFeed,
    activeTag: store.articleList.tag,
    currentTab: store.articleList.tab,
  }));

  const filterGivenArticlesByClick = (tag: any) => {
    const shownFilteredArticles = currentArticlesToFilter.filter((article) =>
      article.tagList.includes(tag),
    );
    return shownFilteredArticles;
  };

  const activateTag = (tag: any) => {
    const yourfiltered = filterGivenArticlesByClick(tag);
    dispatch(setFilteredArticles({ tab: currentTab, articles: yourfiltered }));
  };

  const deactivateTag = () => {
    dispatch(loadAllArticles({ payload: agent.Articles.all() }));
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

  if (tags.length > 0) {
    return (
      <div className={styles.tag_list}>
        {tags.map((tag) => {
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
