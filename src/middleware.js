import agent from './agent';
import { asyncEnd, asyncStart, login, register } from './services/reducers/auth-reducer';
import { appLoad, logout } from './services/reducers/common-reducer';

function isPromise(v) {
  return v && typeof v.then === 'function';
}

const promiseMiddleware = (store) => (next) => (action) => {
  if (isPromise(action.payload?.payload)) {
    store.dispatch(asyncStart(action.type));

    // TODO: переменные currentView и currentState.viewChangeCounter вообще тут бесполезны. Они undefined
    const currentView = store.getState().viewChangeCounter;

    let skipTracking = false;
    if (action.type === appLoad.type) {
      skipTracking = true;
    }

    action.payload.payload.then(
      (res) => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        action.payload.payload = res;
        store.dispatch(asyncEnd(action.payload));
        store.dispatch(action);
      },
      (error) => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        console.log('ERROR', error);
        action.error = true;
        action.payload = error.response.body;
        if (!skipTracking) {
          // TODO: передается payload, а в редьюсере не используется
          store.dispatch(asyncEnd(action.payload));
        }
        store.dispatch(action);
      },
    );
    return;
  }
  next(action);
};
// store было передано в функцию
const localStorageMiddleware = () => (next) => (action) => {
  if (action.type === register.type || action.type === login.type) {
    if (!action.error) {
      window.localStorage.setItem('jwt', action.payload.payload.user.token);
      agent.setToken(action.payload.payload.user.token);
    }
  } else if (action.type === logout.type) {
    window.localStorage.setItem('jwt', '');
    agent.setToken(null);
  }

  next(action);
};

export { promiseMiddleware, localStorageMiddleware };
