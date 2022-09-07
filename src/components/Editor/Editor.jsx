import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import ListErrors from '../ListErrors/ListErrors';
import agent from '../../agent';
import useForm from '../../hooks/useForm';
import TextField from '../ui-library/TextField/TextField';
import TextArea from '../ui-library/TextArea/TextArea';
import Button from '../ui-library/Buttons/Button/Button';
import { CloseIcon } from '../ui-library/Icons';
import styles from './Editor.module.scss';
import { articleSubmit } from '../../services/reducers/editor-reducer';
import { redirect } from '../../services/reducers/common-reducer';
import useTranslate from '../../hooks/useTranslate';
import useSelector from '../../hooks/hooks';

const Editor = () => {
  const { token, errors, inProgress, redirectTo } = useSelector((store) => ({
    token: store.common.token,
    errors: store.settings.errors,
    inProgress: store.settings.inProgress,
    redirectTo: store.common.redirectTo,
  }));
  const [tagList, setTagList] = useState([]);
  const [articleSlug, setArticleSlug] = useState('');
  const localization = useTranslate();
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, []);

  const { values, handleChange, setValues } = useForm({
    title: '',
    description: '',
    link: '',
    body: '',
    tag: '',
  });

  const urlParams = useParams();
  const dispatch = useDispatch();

  const onSubmit = (payload) => {
    dispatch(articleSubmit({ payload }));
  };

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

  useEffect(() => {
    if (!errors && redirectTo) {
      history.push(redirectTo);
      dispatch(redirect());
    }
  }, [errors, redirectTo]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={clsx(styles.title, 'header-h2 align-center color-primary')}>
          {urlParams.slug
            ? localization({ page: 'editor', key: 'editing' })
            : localization({ page: 'editor', key: 'newEntry' })}
        </h1>

        <ListErrors errors={errors} />

        <form className={styles.form}>
          <TextField
            label={localization({ page: 'editor', key: 'header' })}
            name='title'
            onChange={handleChange}
            placeholder={localization({ page: 'editor', key: 'articleName' })}
            type='text'
            value={values.title}
          />
          <TextField
            label={localization({ page: 'editor', key: 'description' })}
            name='description'
            onChange={handleChange}
            placeholder={localization({ page: 'editor', key: 'about' })}
            type='text'
            value={values.description}
          />
          <TextField
            label={localization({ page: 'editor', key: 'image' })}
            name='link'
            onChange={handleChange}
            placeholder={localization({ page: 'editor', key: 'imageLink' })}
            type='text'
            value={values.link}
          />
          <TextArea
            label={localization({ page: 'editor', key: 'content' })}
            name='body'
            onChange={handleChange}
            placeholder={localization({ page: 'editor', key: 'articleText' })}
            rows={8}
            type='text'
            value={values.body}
          />

          <div>
            <TextField
              label={localization({ page: 'editor', key: 'tags' })}
              name='tag'
              onChange={handleChange}
              onKeyUp={watchForEnter}
              placeholder={localization({ page: 'editor', key: 'tagsText' })}
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
            {localization({ page: 'editor', key: 'btnText' })}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Editor;
