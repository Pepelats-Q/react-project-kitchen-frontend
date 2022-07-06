import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { push } from 'connected-react-router';
import agent from '../../agent';
import Header from '../Header/Header';
import { APP_LOAD, REDIRECT, LOGIN } from '../../constants/actionTypes';
import Article from '../Pages/Article';
import Editor from '../Editor/Editor';
import Home from '../Pages/Home';
import Login from '../Login/Login';
import { Profile } from '../Profile/Profile';
import ProfileFavorites from '../ProfileFavorites/ProfileFavorites';
import Register from '../Register/Register';
import Settings from '../Settings/Settings';
import store from '../../store';

const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) => dispatch({
    type: APP_LOAD, payload, token, skipTracking: true,
  }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

class App extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentDidMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    } else {
      // ЭТО ТОЛЬКО ДО 3ГО СПРИНТА, ЧТОБЫ СРАЗУ ЗАХОДИТЬ ЗАЛОГИННЫМ ПОЛЬЗОВАТЕЛЕМ!
      // ВЕСЬ ELSE УДАЛИТЬ В 3М СПРИНТЕ
      store.dispatch({
        type: LOGIN,
        payload: agent.Auth.login('test@ya.ru', '1122'),
      });
      const tokenTemp = window.localStorage.getItem('jwt');
      if (tokenTemp) {
        agent.setToken(token);
      }
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/editor/:slug" component={Editor} />
            <Route path="/editor" component={Editor} />
            <Route path="/article/:id" component={Article} />
            <Route path="/settings" component={Settings} />
            <Route path="/@:username/favorites" component={ProfileFavorites} />
            <Route path="/@:username" component={Profile} />
          </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
