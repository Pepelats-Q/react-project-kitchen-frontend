import { FC, useEffect, useState } from 'react';
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

  const {
    values,
    handleChange,
    setValues,
    setValidities,
    errors,
    isValid,
    validities,
    handleBlur,
    handleSubmitBlur,
  } = useFormValidation({
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

  const watchForEnter = (ev: any) => {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      if (values.tag) {
        if (!tagList.find((element) => element === values.tag)) {
          setTagList([...tagList, values.tag]);
          setValues({ ...values, tag: '' });
        }
      }
      return false;
    }
  };

  const removeTagHandler = (tag: string) => () => {
    setTagList(tagList.filter((element) => element !== tag));
  };

  const submitForm = (ev: any) => {
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
      agent.Articles.get(urlParams.slug).then((res: any) => {
        if (res) {
          setArticleSlug(res.article.slug);
          setValues({
            title: res.article.title,
            description: res.article.description,
            link: res.article.link,
            body: res.article.body,
          });
          setValidities({
            title: true,
            description: true,
            link: true,
            body: true,
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
      isSubmit={false}
      onSubmit={submitForm}
      onSubmitBlur={handleSubmitBlur}
      title={
        urlParams.slug
          ? localization({ page: 'editor', key: 'editing' })
          : localization({ page: 'editor', key: 'newEntry' })
      }
    >
      <TextField
        fieldValid={validities.title}
        label={localization({ page: 'editor', key: 'header' })}
        maxLength={25}
        message={errors.title}
        minLength={2}
        name='title'
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={localization({ page: 'editor', key: 'articleName' })}
        required
        type='text'
        value={values.title}
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
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={localization({ page: 'editor', key: 'imageLink' })}
        required
        type='url'
        value={values.link}
      />
      <TextArea
        label={localization({ page: 'editor', key: 'content' })}
        message={errors.body}
        name='body'
        onChange={handleChange}
        placeholder={localization({ page: 'editor', key: 'articleText' })}
        rows={8}
        value={values.body}
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

        <ul className={styles.tag_list}>
          {(tagList || []).map((tag) => (
            <li key={tag} className={styles.tag}>
              <span>{tag}</span>
              <CloseIcon onClick={removeTagHandler(tag)} size='small' />
            </li>
          ))}
        </ul>
      </div>
    </AuthForm>
  );
};

export default Editor;
