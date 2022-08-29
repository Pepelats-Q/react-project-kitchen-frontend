import { FC } from 'react';
import { TTabButtonProps } from '../../../../utils/typesTs';
import styles from './TabButton.module.scss';

const TabButton: FC<TTabButtonProps> = ({ onClick, isCurrent = true, name }) => (
  <button
    className={`${styles.navTab}${isCurrent ? ` ${styles.navTab_active}` : ''}`}
    onClick={onClick}
    type='button'
  >
    {name}
  </button>
);

export default TabButton;
