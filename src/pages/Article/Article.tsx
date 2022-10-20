import { FC, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import ArticleMeta from './ArticleMeta';
import agent from '../../agent';
import styles from './Article.module.scss';
import { articlePageLoad, articlePageUnload } from '../../services/reducers/article-reducer';
import { getProfile } from '../../services/reducers/profile-reducer';
import CommentContainer from '../../components/Comment/CommentContainer';
import { redirect } from '../../services/reducers/common-reducer';
import { useDispatch, useSelector } from '../../hooks/hooks';
import Tags from '../../components/Tags/Tags';

const Article: FC = () => {
  const { article, currentUser, redirectTo } = useSelector((store) => ({
    article: store.article.article,
    currentUser: store.common.currentUser,
    redirectTo: store.common.redirectTo,
  }));

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const onLoad = (payload: any) => {
    dispatch(articlePageLoad({ payload }));
    if (currentUser) {
      dispatch(getProfile({ payload: agent.Profile.get(currentUser.username) }));
    }
  };
  const onUnload = () => dispatch(articlePageUnload());

  useEffect(() => {
    onLoad(Promise.all([agent.Articles.get(id), agent.Comments.forArticle(id)]));
    return () => {
      onUnload();
    };
  }, [currentUser]);

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(redirect());
    }
  }, [redirectTo]);

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
            <img alt={article.title} className={styles.image} src={article.link} />
          ) : (
            ''
          )}
          {article.tagList.length > 0 ? (
            <div className={styles.tagsContainer}>
              <Tags place='article' tags={article.tagList} />
            </div>
          ) : (
            ''
          )}
          <div className={styles.text}>
            <ReactMarkdown className='text-default'>{article.body}</ReactMarkdown>
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
