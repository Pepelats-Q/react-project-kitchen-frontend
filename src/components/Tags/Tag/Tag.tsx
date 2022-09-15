import { FC, SyntheticEvent } from 'react';
import clsx from 'clsx';
import { useSelector } from '../../../hooks/hooks';
import styles from './Tag.module.scss';

export type TTagProps = {
  tag: string;
  handleClick?: any;
};

const Tag: FC<TTagProps> = ({ handleClick, tag }) => {
  const activeTag = useSelector((store) => store.articleList.tag);

  const tagClickHandler = (ev: SyntheticEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    handleClick();
  };

  return handleClick ? (
    <button
      className={clsx(styles.tag_default, activeTag === tag ? styles.tag_default_active : '')}
      onClick={tagClickHandler}
      type='button'
    >
      {tag}
    </button>
  ) : (
    <div className={styles.tag_default_nolink}>{tag}</div>
  );
};

export default Tag;
