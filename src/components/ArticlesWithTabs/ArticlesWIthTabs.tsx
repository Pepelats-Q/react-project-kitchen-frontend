import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import translations from '../../constants/translations';
import Tags from '../../pages/Home/Tags/Tags';
import { applyTagFilter } from '../../services/reducers/articlelist-reducer';
import { TArticlesWithTabsProps } from '../../utils/typesTs';
import styles from './ArticlesWithTabs.module.scss';

const ArticlesWithTabs: FC<TArticlesWithTabsProps> = ({ children }) => {
  const dispatch = useDispatch<any>();
  const tags = useSelector((state: any) => state.profile.tags);
  const currentLang = useSelector((state: any) => state.header.currentLang);
  const { common } = translations[currentLang];

  const onClickTag = (tag: any, pager: any, payload: any) => {
    dispatch(applyTagFilter({ tag, pager, payload }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.children}>{children}</div>
        <div className={styles.tags}>
          <div className={styles.sidebar}>
            <p className={styles.title}>{common.tagsTitle}</p>
            <Tags onClickTag={onClickTag} tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesWithTabs;
