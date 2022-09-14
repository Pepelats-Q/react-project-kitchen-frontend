import { FC, SyntheticEvent } from 'react';
import { useHistory } from 'react-router';
import styles from './Tag.module.scss';

export type TTagProps = {
  tag: string;
  handleClick: any;
};

const Tag: FC<TTagProps> = ({ handleClick, tag }) => {
  const history = useHistory();

  const tagClickHandler = (ev: SyntheticEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    handleClick();
    history.push('/');
  };
  return (
    <button className={styles.tag_default} onClick={tagClickHandler} type='button'>
      {tag}
    </button>
  );
};

export default Tag;
