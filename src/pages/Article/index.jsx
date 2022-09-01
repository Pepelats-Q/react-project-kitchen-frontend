import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import ArticleMeta from './ArticleMeta';
import CommentContainer from './CommentContainer';
import agent from '../../agent';
import {
  ARTICLE_PAGE_LOADED,
  ARTICLE_PAGE_UNLOADED,
  GET_PROFILE_DATA,
} from '../../constants/actionTypes';
import styles from './Article.module.scss';
import translations from '../../constants/translations';

const Article = () => {
  const dispatch = useDispatch();

  const article = useSelector((state) => state.article.article);

  const currentUser = useSelector((state) => state.common.currentUser);
  const currentLang = useSelector((state) => state.header.currentLang);
  const { articlesLang } = translations[currentLang];

  const onLoad = (payload) => {
    dispatch({ type: ARTICLE_PAGE_LOADED, payload });
    if (currentUser) {
      dispatch({ type: GET_PROFILE_DATA, payload: agent.Profile.get(currentUser.username) });
    }
  };
  const onUnload = () => dispatch({ type: ARTICLE_PAGE_UNLOADED });

  const { id } = useParams();

  useEffect(() => {
    onLoad(Promise.all([agent.Articles.get(id), agent.Comments.forArticle(id)]));

    return () => onUnload();
  }, [currentUser]);

  if (!article) {
    return null;
  }
  const canModify = currentUser && currentUser?.username === article?.author?.username;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.container}>
          <ArticleMeta article={article} canModify={canModify} />
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.mainArticle}>
          <h1 className={styles.title}>{article.title}</h1>
          {article.link ? (
            <img src={article.link} alt={article.title} className={styles.image} />
          ) : (
            ''
          )}

          <div dangerouslySetInnerHTML={{ __html: article.body }} className={styles.body} />
          <div className={styles.tagsContainer}>
            <p>{articlesLang.tags}</p>
            <ul className={styles.tag_list}>
              {article.tagList.map((tag) => (
                <li key={tag} className={styles.tag_default}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.comments}>
            <CommentContainer slug={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
