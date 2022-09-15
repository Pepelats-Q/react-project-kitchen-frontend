import { FC } from 'react';
import agent from '../../agent';
import { useDispatch } from '../../hooks/hooks';
import useTranslate from '../../hooks/useTranslate';
import { applyTagFilter } from '../../services/reducers/articlelist-reducer';
import Tag from './Tag/Tag';
import styles from './Tags.module.scss';

export type TTagsProps = {
  tags: Array<string>;
};

const Tags: FC<TTagsProps> = ({ tags }) => {
  const localization = useTranslate();
  const dispatch = useDispatch();

  if (tags) {
    return (
      <div className={styles.tag_list}>
        {tags.map((tag) => {
          const handleClick = () => {
            dispatch(
              applyTagFilter({
                tag,
                pager: (page: any) => agent.Articles.byTag(tag, page),
                payload: agent.Articles.byTag(tag),
              }),
            );
          };
          return <Tag key={tag} handleClick={handleClick} tag={tag} />;
        })}
      </div>
    );
  }
  return <div>{localization({ page: 'common', key: 'tagsLoading' })}</div>;
};

export default Tags;
