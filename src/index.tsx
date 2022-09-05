import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import './components/ui-library/ui-style/ui-typography.scss';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import reportWebVitals from './reportWebVitals';
import App from './components/App/App';
import store from './services/store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConnectedRouter history={history}>
        <Switch>
          <Route component={App} path='/' />
        </Switch>
      </ConnectedRouter>
    </BrowserRouter>
  </Provider>
  );
  
  reportWebVitals();
