import React, { FC, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import agent from '../../agent';
import TextField from '../ui-library/TextField/TextField';
import TextArea from '../ui-library/TextArea/TextArea';
import { CloseIcon } from '../ui-library/Icons';
import styles from './Editor.module.scss';
import { articleSubmit } from '../../services/reducers/editor-reducer';
import { redirect } from '../../services/reducers/common-reducer';
import useTranslate from '../../hooks/useTranslate';
import { useDispatch, useSelector } from '../../hooks/hooks';
import useFormValidation from '../../hooks/useFormValidation';
import AuthForm from '../AuthForm/AuthForm';

const Editor: FC = () => {
  const { token, errorsStore, redirectTo } = useSelector((store) => ({
    token: store.common.token,
    errorsStore: store.auth.errors,
    redirectTo: store.common.redirectTo,
  }));
  const errorsEditor = errorsStore?.errors;

  const [tagList, setTagList] = useState<Array<string>>([]);
  const [articleSlug, setArticleSlug] = useState('');
  const localization = useTranslate();
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/login');
    }
  }, []);

  const { values, handleChange, setValues, errors, isValid, validities } = useFormValidation({
    title: '',
    description: '',
    link: '',
    body: '',
    tag: '',
  });

  const urlParams = useParams<{ slug: string }>();
  const dispatch = useDispatch();

  const onSubmit = (payload: any) => {
    dispatch(articleSubmit({ payload }));
  };

  const watchForEnter = (ev: React.KeyboardEvent) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      if (values.tag) {
        if (!tagList.find((element) => element === values.tag)) {
          setTagList([...tagList, values.tag]);
          setValues({ ...values, tag: '' });
        }
      }
    }
  };

  const removeTagHandler = (tag: string) => () => {
    setTagList(tagList.filter((element) => element !== tag));
  };

  const submitForm = () => {
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
      agent.Articles.get(urlParams.slug).then((res: any) => {
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
    if (!errorsEditor && redirectTo) {
      history.push(redirectTo);
      dispatch(redirect());
    }
  }, [errorsEditor, redirectTo]);

  return (
    <AuthForm
      apiErrors={errorsEditor}
      btnText={localization({ page: 'editor', key: 'btnText' })}
      formName='editor'
      isFormValid={isValid}
      onSubmit={submitForm}
      title={
        urlParams.slug
          ? localization({ page: 'editor', key: 'editing' })
          : localization({ page: 'editor', key: 'newEntry' })
      }
    >
      <TextField
        label={`${localization({ page: 'editor', key: 'header' })}`}
        name='title'
        onChange={handleChange}
        placeholder={localization({ page: 'editor', key: 'articleName' })}
        type='text'
        value={values.title}
        maxLength={25}
        minLength={2}
        required
        message={errors.title}
        fieldValid={validities.title}
      />

      <TextField
        fieldValid={validities.description}
        label={localization({ page: 'editor', key: 'description' })}
        maxLength={25}
        message={errors.description}
        minLength={2}
        name='description'
        onChange={handleChange}
        placeholder={localization({ page: 'editor', key: 'about' })}
        type='text'
        value={values.description}
      />
      <TextField
        fieldValid={validities.link}
        label={localization({ page: 'editor', key: 'image' })}
        message={errors.link}
        minLength={6}
        name='link'
        onChange={handleChange}
        placeholder={localization({ page: 'editor', key: 'imageLink' })}
        required
        type='url'
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
        message={errors.body}
      />

      <div>
        <TextField
          fieldValid={validities.tag}
          label={localization({ page: 'editor', key: 'tags' })}
          message={errors.tag}
          minLength={2}
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
    </AuthForm>
  );
};

export default Editor;
