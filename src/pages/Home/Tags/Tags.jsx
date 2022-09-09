import PropTypes from 'prop-types';
import agent from '../../../agent';
import useTranslate from '../../../hooks/useTranslate';
import styles from './tags.module.scss';

const Tags = ({ tags, onClickTag }) => {
  const localization = useTranslate();

  if (tags) {
    return (
      <div className={styles.tag_list}>
        {tags.map((tag) => {
          const handleClick = (ev) => {
            ev.preventDefault();
            onClickTag(tag, (page) => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag));
          };

          return (
            <a key={tag} className={styles.tag_default} href='/' onClick={handleClick}>
              {tag}
            </a>
          );
        })}
      </div>
    );
  }
  return <div>{localization({ page: 'common', key: 'tagsLoading' })}</div>;
};

Tags.propTypes = {
  onClickTag: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
