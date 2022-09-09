import { TypedUseSelectorHook, useSelector as selectorHook } from 'react-redux';
import store from '../services/store/store';

type RootState = ReturnType<typeof store.getState>;

const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default useSelector;
