import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import ListErrors from '../ListErrors/ListErrors';
import agent from '../../agent';
import { ARTICLE_SUBMITTED } from '../../constants/actionTypes';
import useForm from '../../hooks/useForm';
import TextField from '../ui-library/TextField/TextField';
import TextArea from '../ui-library/TextArea/TextArea';
import Button from '../ui-library/Buttons/Button/Button';
import { CloseIcon } from '../ui-library/Icons';

import styles from './Editor.module.scss';

const Editor = () => {
  const { errors, inProgress } = useSelector((store) => ({
    errors: store.settings.errors,
    inProgress: store.settings.inProgress,
  }));
  const [tagList, setTagList] = useState([]);
  const [articleSlug, setArticleSlug] = useState('');

  const { values, handleChange, setValues } = useForm({
    title: '',
    description: '',
    link: '',
    body: '',
    tag: '',
  });

  const urlParams = useParams();

  const dispatch = useDispatch();

  const onSubmit = (payload) => dispatch({ type: ARTICLE_SUBMITTED, payload });

  const watchForEnter = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      if (!tagList.find((element) => element === values.tag)) {
        setTagList([...tagList, values.tag]);
        setValues({ ...values, tag: '' });
      }
    }
  };

  const removeTagHandler = (tag) => () => {
    setTagList(tagList.filter((element) => element !== tag));
  };

  const submitForm = (ev) => {
    ev.preventDefault();
    const article = {
      title: values.title,
      description: values.description,
      link: values.link,
      body: values.body,
      tagList: [...tagList],
    };

    const slug = { slug: articleSlug };
    const promise = articleSlug
      ? agent.Articles.update(Object.assign(article, slug))
      : agent.Articles.create(article);

    onSubmit(promise);
  };

  useEffect(() => {
    if (urlParams.slug) {
      agent.Articles.get(urlParams.slug).then((res) => {
        if (res) {
          setArticleSlug(res.article.slug);
          setValues({
            title: res.article.title,
            description: res.article.description,
            link: res.article.link,
            body: res.article.body,
          });
          setTagList(res.article.tagList);
        }
      });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={clsx(styles.title, 'header-h2 align-center color-primary')}>
          {urlParams.slug ? 'Редактирование' : 'Новая запись'}
        </h1>

        <ListErrors errors={errors} />

        <form className={styles.form}>
          <TextField
            label='Заголовок'
            name='title'
            onChange={handleChange}
            placeholder='Название статьи'
            type='text'
            value={values.title}
          />
          <TextField
            label='Описание'
            name='description'
            onChange={handleChange}
            placeholder='О чем статья'
            type='text'
            value={values.description}
          />
          <TextField
            label='Изображение'
            name='link'
            onChange={handleChange}
            placeholder='Ссылка на изображение'
            type='text'
            value={values.link}
          />
          <TextArea
            label='Содержание'
            name='body'
            onChange={handleChange}
            placeholder='Текст статьи (markdown-разметка)'
            rows={8}
            type='text'
            value={values.body}
          />

          <div>
            <TextField
              label='Теги'
              name='tag'
              onChange={handleChange}
              onKeyUp={watchForEnter}
              placeholder='Введите тег и нажмите Enter'
              type='text'
              value={values.tag}
            />

            <div className={styles.tag_list}>
              {(tagList || []).map((tag) => (
                <div key={tag} className={styles.tag}>
                  <span>{tag}</span>
                  <CloseIcon onClick={removeTagHandler(tag)} size='small' />
                </div>
              ))}
            </div>
          </div>

          <Button className={styles.submit_button} disabled={inProgress} onClick={submitForm}>
            Опубликовать
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Editor;
