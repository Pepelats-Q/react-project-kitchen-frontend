import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import agent from '../../agent';
import Header from '../Header';
import { APP_LOAD } from '../../constants/actionTypes';
import Article from '../../pages/Article';
import Editor from '../Editor/Editor';
import Home from '../../pages/Home';
import Login from '../../pages/Login/Login';
import Profile from '../../pages/Profile/Profile';
import Register from '../../pages/Register/Register';
import Settings from '../Settings/Settings';
import UI from '../../pages/UI/UI';
import NotLoadedApp from '../NotLoadedApp/NotLoadedApp';

const App = () => {
  const dispatch = useDispatch();

  const onLoad = (payload, token) =>
    dispatch({
      type: APP_LOAD,
      payload,
      token,
      skipTracking: true,
    });

  useEffect(() => {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }
    onLoad(token ? agent.Auth.current() : null, token);
  }, []);

  const appLoaded = useSelector((state) => state.common.appLoaded);

  if (appLoaded) {
    return (
      <div>
        <Header />

        <Switch>
          <Route component={Home} exact path='/' />
          <Route component={Login} path='/login' />
          <Route component={Register} path='/register' />
          <Route component={Editor} path='/editor/:slug' />
          <Route component={Editor} path='/editor' />
          <Route component={Article} path='/article/:id' />
          <Route component={Settings} path='/settings' />
          <Route component={Profile} path='/@:username' />
          <Route component={UI} path='/ui' />
        </Switch>
      </div>
    );
  }
  return (
    <div>
      <NotLoadedApp />
    </div>
  );
};

export default App;
