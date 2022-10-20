import { TArticleActions } from '../services/reducers/article-reducer';
import { TArticleListActions } from '../services/reducers/articlelist-reducer';
import { TAuthActions } from '../services/reducers/auth-reducer';
import { TCommonActions } from '../services/reducers/common-reducer';
import { TEditorActions } from '../services/reducers/editor-reducer';
import { TProfileActions } from '../services/reducers/profile-reducer';
import { TSettingsActions } from '../services/reducers/settings-reducer';

export type TAppActions =
  | TArticleActions
  | TArticleListActions
  | TAuthActions
  | TCommonActions
  | TEditorActions
  | TProfileActions
  | TSettingsActions;

export type TArticleAction = {};
