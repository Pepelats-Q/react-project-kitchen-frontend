import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import agent from '../../../agent';
import translations from '../../../constants/translations';
import styles from './tags.module.scss';

const Tags = ({ tags, onClickTag }) => {
  const currentLang = useSelector((state) => state.header.currentLang);
  const { common } = translations[currentLang];

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
  return <div>{common.tagsLoading}</div>;
};

Tags.propTypes = {
  onClickTag: PropTypes.func.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default Tags;
