import { Link } from 'react-router-dom';
import ArticleActions from './ArticleActions';

const ArticleMeta = (props) => {
  const { article } = props;
  return (
    <div className='article-meta'>
      <Link to={`/@${article.author.username}`}>
        <img
          alt={article.author.username}
          src={article.author.image}
        />
      </Link>

      <div className='info'>
        <Link
          className='author'
          to={`/@${article.author.username}`}
        >
          {article.author.username}
        </Link>
        <span className='date'>
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions
        article={article}
        canModify={props.canModify}
      />
    </div>
  );
};

export default ArticleMeta;
