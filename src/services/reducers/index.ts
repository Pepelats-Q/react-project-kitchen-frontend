import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import history from '../../history';
import articleReducer from './article-reducer';
import articlelistReducer from './articlelist-reducer';
import authReducer from './auth-reducer';
import commonReducer from './common-reducer';
import editorReducer from './editor-reducer';
import profileReducer from './profile-reducer';
import settingsReducer from './settings-reducer';

const rootReducer = combineReducers({
  article: articleReducer,
  articleList: articlelistReducer,
  auth: authReducer,
  common: commonReducer,
  editor: editorReducer,
  profile: profileReducer,
  settings: settingsReducer,
  router: connectRouter(history),
});

export default rootReducer;
