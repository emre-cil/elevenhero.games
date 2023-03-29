import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import  apiSlice  from './api/apiSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

 const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },
  middleware: (getdefaultMiddleware) => getdefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;