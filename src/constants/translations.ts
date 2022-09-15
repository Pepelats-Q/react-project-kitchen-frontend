type TComments = {
  comments: {
    signIn: string;
    or: string;
    signUp: string;
    signInText: string;
    writeComment: string;
    comments: string;
    post: string;
    emptyAlert: string;
  };
};
type TArticles = {
  noArticlesMessage: string;
  readMore: string;
  tags: string;
  filterreset: string;
  noTags: string;
};
type TCommon = {
  loading: string;
  tagsTitle: string;
  tagsLoading: string;
  appNotLoaded: string;
};
type THomePageTexts = {
  bannerText: string;
  tab1Text: string;
  tab2Text: string;
};
type THeader = {
  mainPageText: string;
  newNoteText: string;
  tab2Text: string;
  registerText: string;
  loginText: string;
};

type TProfile = {
  yourPosts: string;
  usersPosts: string;
  favoritePosts: string;
  editProfile: string;
  subscribe: string;
  unsubscribe: string;
};

type TAuthForm = {
  registerText: string;
  registerQuestion: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderPass: string;
  loginText: string;
  loginQuestion: string;
  requiredField: string;
  apiCorrectMessage: string;
};

type TEditor = {
  editing: string;
  newEntry: string;
  header: string;
  articleName: string;
  description: string;
  about: string;
  image: string;
  imageLink: string;
  content: string;
  articleText: string;
  tags: string;
  tagsText: string;
  btnText: string;
};

type TSettings = {
  image: string;
  imageText: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderPass: string;
  info: string;
  logout: string;
  yourSettings: string;
  saveButton: string;
};

type TTexts = {
  articlesLang: TArticles;
  common: TCommon;
  header: THeader;
  homePage: THomePageTexts;
  profile: TProfile;
  authForm: TAuthForm;
  editor: TEditor;
  settings: TSettings;

  comments: TComments;
};

type Ttranslations = {
  en: TTexts;
  ru: TTexts;
};

const translations: Ttranslations | any = {
  en: {
    articlesLang: {
      noArticlesMessage: "There're no articles...",
      readMore: 'Read more...',
      tags: 'Tags: ',
      edit: ' Edit Article',
      delete: 'Delete Article',
      filterreset: 'Erase filter',
      noTags: "There're no tags for these articles",
    },
    common: {
      loading: 'Loading...',
      tagsTitle: 'Popular tags',
      tagsLoading: 'Tags loading...',
      appNotLoaded: 'App couldnt load. Try again later',
    },
    header: {
      mainPageText: 'Homepage',
      newNoteText: 'New entry',
      loginText: 'Login',
      registerText: 'Register',
    },
    homePage: {
      bannerText: 'Somewhere in a galaxy far far away...',
      tab1Text: 'Your feed',
      tab2Text: 'All posts',
    },
    profile: {
      yourPosts: 'Your posts',
      usersPosts: "User's posts",
      favoritePosts: 'Favorites',
      editProfile: 'Edit your profile',
      subscribe: ' Subscribe',
      unsubscribe: ' Unsubscribe',
    },
    authForm: {
      registerText: 'Register',
      registerQuestion: 'Do you already have an account?',
      placeholderName: 'Username',
      placeholderEmail: 'Email',
      placeholderPass: 'Password',
      loginText: 'Log in',
      loginQuestion: 'Do you need to register?',
      requiredField: 'This is a required field.',
      apiCorrectMessage: 'Fill in all fields correctly',
    },
    editor: {
      editing: 'Edit entry',
      newEntry: 'New entry',
      header: 'Header',
      articleName: 'Article name',
      description: 'Desciription',
      about: 'Briefly describe the article',
      image: 'Image',
      imageLink: 'Image link',
      content: 'Content',
      articleText: 'Article text in markdown',
      tags: 'Tags',
      tagsText: 'Enter a tag and press Enter',
      btnText: 'Publish',
    },
    settings: {
      image: 'Profile image',
      imageText: 'URL to profile image',
      placeholderName: 'Username',
      placeholderEmail: 'Email',
      placeholderPass: 'New password',
      info: 'Some information about you',
      logout: 'Log out',
      yourSettings: 'Your settings',
      saveButton: 'Save settings',
    },

    comments: {
      signIn: 'Sign in',
      or: 'or',
      signUp: 'sign up',
      signInText: ' to add comments on this article.',
      writeComment: 'Write a comment...',
      comments: 'Comments',
      post: 'Post Comment',
      emptyAlert: 'Your comment is empty. Please write something',
    },
  },
  ru: {
    articlesLang: {
      noArticlesMessage: 'Нет статей...',
      readMore: 'Читать продолжение...',
      tags: 'Теги: ',
      edit: 'Редактировать статью',
      delete: 'Удалить статью',
      filterreset: 'Сбросить фильтр',
      noTags: 'Пока у этих статей нет тегов',
    },
    common: {
      loading: 'Загрузка...',
      tagsTitle: 'Популярные теги',
      tagsLoading: 'Загрузка тегов...',
      appNotLoaded: 'Приложение не может быть загружено. Попробуйте снова позднее.',
    },
    header: {
      mainPageText: 'Главная',
      newNoteText: 'Новая запись',
      loginText: 'Войти',
      registerText: 'Регистрация',
    },
    homePage: {
      bannerText: 'Где-то, в далекой-далекой галактике...',
      tab1Text: 'Ваша лента',
      tab2Text: 'Лента',
    },
    profile: {
      yourPosts: 'Ваши посты',
      usersPosts: 'Посты пользователя',
      favoritePosts: 'Любимые посты',
      editProfile: 'Редактировать профиль',
      subscribe: ' Подписаться',
      unsubscribe: ' Отменить подписку',
    },
    authForm: {
      registerText: 'Зарегистрироваться',
      registerQuestion: 'Уже есть аккаунт?',
      placeholderName: 'Имя пользователя',
      placeholderEmail: 'Email',
      placeholderPass: 'Пароль',
      loginText: 'Войти',
      loginQuestion: 'Нужно зарегистрироваться?',
      requiredField: 'Поле обязательно для заполнения',
      apiCorrectMessage: 'Заполните все поля формы верно',
    },

    editor: {
      editing: 'Редактирование',
      newEntry: 'Новая запись',
      header: 'Заголовок',
      articleName: 'Название статьи',
      description: 'Описание',
      about: 'О чем статья',
      image: 'Изображение',
      imageLink: 'Ссылка на изображение',
      content: 'Содержание',
      articleText: 'Текст статьи (markdown-разметка)',
      tags: 'Теги',
      tagsText: 'Введите тег и нажмите Enter',
      btnText: 'Опубликовать',
    },
    settings: {
      image: 'Изображение профиля',
      imageText: 'URL-адрес изображения профиля',
      placeholderName: 'Имя пользователя',
      placeholderEmail: 'Email',
      placeholderPass: 'Новый пароль',
      info: 'Информация о вас',
      logout: 'Выйти из аккаунта',
      yourSettings: 'Ваши настройки',
      saveButton: 'Сохранить',
    },
    comments: {
      signIn: 'Войдите',
      or: 'или',
      signUp: 'зарегистрируйтесь',
      signInText: ', чтобы добавить комментарий к этой статье',
      writeComment: 'Напишите комментарий...',
      comments: 'Комментарии',
      post: 'Опубликовать комментарий',
      emptyAlert: 'Ваш комментарий пуст. Напишите что-нибудь',
    },
  },
};

export default translations;
