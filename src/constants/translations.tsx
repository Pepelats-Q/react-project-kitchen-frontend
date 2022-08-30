type TArticles = {
  noArticlesMessage: string;
  readMore: string;
};
type TCommon = {
  loading: string;
  tagsTitle: string;
  tagsLoading: string;
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
};

type TTexts = {
  articlesLang: TArticles;
  common: TCommon;
  header: THeader;
  homePage: THomePageTexts;
  profile: TProfile;
};

type Ttranslations = {
  en: TTexts;
  ru: TTexts;
};

const translations: Ttranslations | any = {
  en: {
    articlesLang: {
      noArticlesMessage: "There's no articles...",
      readMore: 'Read more...',
    },
    common: {
      loading: 'Loading...',
      tagsTitle: 'Popular tags',
      tagsLoading: 'Tags loading...',
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
    },
  },
  ru: {
    articlesLang: {
      noArticlesMessage: 'Нет статей...',
      readMore: 'Читать продолжение...',
    },
    common: {
      loading: 'Загрузка...',
      tagsTitle: 'Популярные теги',
      tagsLoading: 'Загрузка тегов...',
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
    },
  },
};

export default translations;
