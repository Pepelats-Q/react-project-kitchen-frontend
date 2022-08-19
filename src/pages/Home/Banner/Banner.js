import style from './banner.module.scss';

const Banner = ({ appName }) => (
  <div className={style.banner}>
    <div className={style.container}>
      <h1 className={style.title}>{appName}</h1>
      <p className={style.text}>
        Где-то, в далекой-далекой галактике ...
      </p>
    </div>
  </div>
);

export default Banner;
