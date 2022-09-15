import { FC, SyntheticEvent } from 'react';
import { useSelector } from '../../../hooks/hooks';
import styles from './Tag.module.scss';

export type TTagProps = {
  tag: string;
  handleClick: any;
};

const Tag: FC<TTagProps> = ({ handleClick, tag }) => {
  const activeTag = useSelector((store) => store.articleList.tag);

  const tagClickHandler = (ev: SyntheticEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    handleClick();
    // history.push('/'); из-за этого был редирект, коммент можно удалять ?
  };
  return (
    <button
      className={`${styles.tag_default} ${activeTag === tag ? styles.tag_default_active : ''}`}
      onClick={tagClickHandler}
      type='button'
    >
      {tag}
    </button>
  );
};

export default Tag;
