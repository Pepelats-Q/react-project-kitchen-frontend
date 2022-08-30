import { FC } from 'react';
import { useSelector } from 'react-redux';
// import { LocalizationContext } from '../../../contexts/localization';
import { TBannerProps } from '../../../utils/typesTs';
import style from './banner.module.scss';
import translations from '../../../constants/translations';

const Banner: FC<TBannerProps> = ({ appName }) => {
  /* const translations = useContext(LocalizationContext);
  const { homePage } = translations; */

  const currentLang = useSelector((state: any) => state.header.currentLang);
  const { homePage } = translations[currentLang];

  return (
    <div className={style.banner}>
      <div className={style.container}>
        <h1 className={style.title}>{appName}</h1>
        <p className={style.text}>{homePage.bannerText}</p>
      </div>
    </div>
  );
};

export default Banner;
