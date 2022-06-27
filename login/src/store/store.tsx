import React, { useCallback } from 'react';
import { configureStore, Action } from '@reduxjs/toolkit';
import loginSliceReducer, { login } from './loginSlice';
import { ThunkAction } from 'redux-thunk';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from './hooks';
import { ICredentials } from '../pages/signin';

const store = configureStore({
	reducer: {
		loginStore: loginSliceReducer,
	},
});

export const LoginProvider = ({ children }: any) => {
	return <Provider store={store}>{children}</Provider>;
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
export default store;

export const useLoginStore = () => {
	const dispatch = useAppDispatch();
	const loginState = useAppSelector((state) => state.loginStore);

	const onLoadSignInCallback = useCallback(
		(user: ICredentials) => {
			dispatch(login(user));
		},
		[dispatch]
	);

	return {
		loginState,
		onLoadSignIn: onLoadSignInCallback,
	};
};
