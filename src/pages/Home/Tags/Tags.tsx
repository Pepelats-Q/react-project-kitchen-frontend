import React, { FC } from 'react';
import agent from '../../../agent';
import useTranslate from '../../../hooks/useTranslate';
import styles from './tags.module.scss';

const Tags: FC<{ tags: Array<string>; onClickTag: any }> = ({ tags, onClickTag }) => {
  const localization = useTranslate();

  if (tags) {
    return (
      <div className={styles.tag_list}>
        {tags.map((tag) => {
          const handleClick = (ev: React.SyntheticEvent) => {
            ev.preventDefault();
            onClickTag(
              tag,
              (page: any) => agent.Articles.byTag(tag, page),
              agent.Articles.byTag(tag),
            );
          };

          return (
            <a key={tag} className={styles.tag_default} href='/' onClick={handleClick}>
              {tag}
            </a>
          );
        })}
      </div>
    );
  }
  return <div>{localization({ page: 'common', key: 'tagsLoading' })}</div>;
};

export default Tags;
