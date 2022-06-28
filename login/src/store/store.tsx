import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import loginSliceReducer, { loginSelector } from './loginSlice';
import { Provider } from 'react-redux';
import { useAppSelector } from './hooks';

const store = configureStore({
	reducer: {
		loginStore: loginSliceReducer,
	},
});

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
	return <Provider store={store}>{children}</Provider>;
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;

export const useLoginStore = () => {
	const loginState = useAppSelector(loginSelector);
	return {
		loginState,
	};
};
