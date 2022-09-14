import React, { FC, useEffect, useState } from 'react';
import Button from '../ui-library/Buttons/Button/Button';
import styles from './ScrollTop.module.scss';

type TScrollTopProps = {
  curRef: React.RefObject<HTMLDivElement>;
  scrollPosition: number;
};

const ScrollTop: FC<TScrollTopProps> = ({ curRef, scrollPosition }) => {
  const [isToTopShown, setIsToTopShown] = useState(false);

  const handleScrollUp = () => {
    curRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handleVisibleButton = () => {
    if (scrollPosition > 150) {
      return setIsToTopShown(true);
    }
    return setIsToTopShown(false);
  };

  useEffect(() => {
    handleVisibleButton();
  }, [scrollPosition]);

  /*
      <button
      type='button'
      className={`${styles.btn_toTop} ${
        isToTopShown ? styles.btn_toTop_shown : styles.btn_toTop_hidden
      }`}
      onClick={handleScrollUp}
    >&#129045;</button>

    */

  return (
    <Button
      onClick={handleScrollUp}
      type='lang'
      className={`${styles.btn_toTop} ${
        isToTopShown ? styles.btn_toTop_shown : styles.btn_toTop_hidden
      }`}
    >
      &#129045;
    </Button>
  );
};

export default ScrollTop;
