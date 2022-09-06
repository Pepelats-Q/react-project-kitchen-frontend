import { TypedUseSelectorHook, useSelector as selectorHook } from 'react-redux';
import { RootState } from '..';

const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default useSelector;
