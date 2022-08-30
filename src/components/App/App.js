import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { push } from 'connected-react-router';
import agent from '../../agent';
import Header from '../Header/Header';
import { APP_LOAD, REDIRECT } from '../../constants/actionTypes';
import Article from '../../pages/Article';
import Editor from '../Editor/Editor';
import Home from '../../pages/Home';
import Login from '../../pages/Login/Login';
import Profile from '../../pages/Profile/Profile';
// import ProfileFavorites from '../../pages/Profile/ProfileFavorites';
import Register from '../../pages/Register/Register';
import Settings from '../Settings/Settings';
import store from '../../store';
import UI from '../../pages/UI/UI';

const mapStateToProps = (state) => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo,
});

const mapDispatchToProps = (dispatch) => ({
  onLoad: (payload, token) =>
    dispatch({
      type: APP_LOAD,
      payload,
      token,
      skipTracking: true,
    }),
  onRedirect: () => dispatch({ type: REDIRECT }),
});

class App extends React.Component {
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      this.context?.router?.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentDidMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }

  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header appName={this.props.appName} currentUser={this.props.currentUser} />

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
        <Header appName={this.props.appName} currentUser={this.props.currentUser} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
