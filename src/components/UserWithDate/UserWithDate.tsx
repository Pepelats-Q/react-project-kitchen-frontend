import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from '../../hooks/hooks';
import avatar from '../../images/avatarTemp.svg';
import { TUserWIthDate } from '../../utils/typesComponentProps';
import styles from './userWithDate.module.scss';

const UserWithDate: FC<TUserWIthDate> = ({ author, date }) => {
  const defaultAvatar = 'https://static.productionready.io/images/smiley-cyrus.jpg';

  const currentLang = useSelector((state) => state.common.currentLang);

  return (
    <div className={styles.container}>
      <Link className={styles.avatar} to={`/@${author.username}`}>
        {author.image === defaultAvatar ? (
          <img alt={author.username} src={avatar} />
        ) : (
          <img alt={author.username} src={author.image} />
        )}
      </Link>

      <div className={styles.info}>
        <Link className={styles.author} to={`/@${author.username}`}>
          {author.username}
        </Link>
        <span className={styles.date}>
          {new Intl.DateTimeFormat(currentLang, {
            weekday: 'short',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          }).format(new Date(date))}
        </span>
      </div>
    </div>
  );
};

export default UserWithDate;
