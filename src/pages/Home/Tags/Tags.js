import agent from '../../../agent';
import styles from './tags.module.scss';

const Tags = (props) => {
  const { tags } = props;
  if (tags) {
    return (
      <div className={styles.tag_list}>
        {tags.map((tag) => {
          const handleClick = (ev) => {
            ev.preventDefault();
            props.onClickTag(
              tag,
              (page) => agent.Articles.byTag(tag, page),
              agent.Articles.byTag(tag),
            );
          };

          return (
            <a
              key={tag}
              className={styles.tag_default}
              href='/'
              onClick={handleClick}
            >
              {tag}
            </a>
          );
        })}
      </div>
    );
  }
  return <div>Загрузка тегов...</div>;
};

export default Tags;
