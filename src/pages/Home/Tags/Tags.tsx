import React, { FC, useState } from 'react';
import agent from '../../../agent';
import useTranslate from '../../../hooks/useTranslate';
import styles from './tags.module.scss';

export type TTagsProps = {
  tags: Array<string>;
  onClickTag: any;
};

const Tags: FC<TTagsProps> = ({ tags, onClickTag }) => {
  const localization = useTranslate();
  const [currentTag, setCurrentTag] = useState('');

  if (tags) {
    return (
      <div className={styles.tag_list}>
        {tags.map((tag) => {
          const handleClick = (ev: React.SyntheticEvent) => {
            ev.preventDefault();
            if (tag === currentTag) {
              console.log('unmake tag: ');
            } else {
              setCurrentTag(tag);
              onClickTag(
                tag,
                (page: any) => agent.Articles.byTag(tag, page),
                agent.Articles.byTag(tag),
              );
            }
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
