import { FC, useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import agent from '../../agent';
import Header from '../Header';
import Article from '../../pages/Article';
import Editor from '../Editor/Editor';
import Home from '../../pages/Home';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import Settings from '../Settings/Settings';
import UI from '../../pages/UI/UI';
import NotLoadedApp from '../NotLoadedApp/NotLoadedApp';
import { appLoad } from '../../services/reducers/common-reducer';
import styles from './App.module.scss';
import Profile from '../../pages/Profile/Profile';
import { TranslationProvider } from '../../contexts/context';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { clearApiMessage } from '../../services/reducers/auth-reducer';

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
    dispatch(appLoad({ payload: token ? agent.Auth.current() : null }));
  }, []);

  const location = useLocation();

  useEffect(() => {
    dispatch(clearApiMessage());
  }, [location]);

  const appLoaded = useSelector((store) => store.common.appLoaded);

  if (appLoaded) {
    return (
      <TranslationProvider>
        <main className={styles.main}>
          <Header />
          <Switch>
            <Route component={Home} exact path='/' />
            <Route component={Home} exact path='/your-feed' />
            <Route component={Login} path='/login' />
            <Route component={Register} path='/register' />
            <Route component={Editor} path='/editor/:slug' />
            <Route component={Editor} path='/editor' />
            <Route component={Article} path='/article/:id' />
            <Route component={Settings} path='/settings' />
            <Route component={Profile} exact path='/@:username' />
            <Route component={Profile} path='/@:username/favorites' />
            <Route component={UI} path='/ui' />
          </Switch>
        </main>
      </TranslationProvider>
    );
  }
  return (
    <TranslationProvider>
      <main className={styles.main}>
        <Header />
        <NotLoadedApp />
      </main>
    </TranslationProvider>
  );
};

export default App;
