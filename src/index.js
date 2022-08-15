import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import './components/ui-library/ui-style/ui-typography.scss';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import store from './store';
import history from './history';

import App from './components/App/App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConnectedRouter history={history}>
        <Switch>
          <Route component={App} path='/' />
        </Switch>
      </ConnectedRouter>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
