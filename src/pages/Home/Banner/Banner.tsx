import { FC } from 'react';
import style from './banner.module.scss';
import useTranslate from '../../../hooks/useTranslate';
import useSelector from '../../../hooks/hooks';

const Banner: FC = () => {
  const localization = useTranslate();
  const appName = useSelector((store) => store.common.appName);
  return (
    <div className={style.banner}>
      <div className={style.container}>
        <h1 className={style.title}>{appName}</h1>
        <p className={style.text}>{localization({ page: 'homePage', key: 'bannerText' })}</p>
      </div>
    </div>
  );
};

export default Banner;
