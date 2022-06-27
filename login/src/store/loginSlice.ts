import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICredentials } from '../pages/signin';
import { AppThunk } from './store';

export interface LoginState {
	isLoggedIn: boolean;
	token: string;
	errors: string;
}

const initialState: LoginState = {
	isLoggedIn: false,
	token: '',
	errors: '',
};

const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setIsLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
			state.isLoggedIn = payload;
		},

		setErrors: (state, { payload }: PayloadAction<string>) => {
			state.errors = payload;
		},

		setToken: (state, { payload }: PayloadAction<string>) => {
			state.token = payload;
		},
	},
});

export const { setIsLoggedIn, setErrors, setToken } = loginSlice.actions;

export default loginSlice.reducer;

export const loginSelector = (state: { loginStore: LoginState }) => state.loginStore;

export const login = (credentials: ICredentials): AppThunk => {
	return async (dispatch: any) => {
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		};
		try {
			const rawResponse = await fetch(
				'http://localhost:8090/api/v1/authentication/login',
				options
			);
			const content = await rawResponse.json();
			const token = await content.data[0];
			localStorage.setItem('token', token);
			dispatch(setIsLoggedIn(true));
			dispatch(setToken(token));
		} catch (error) {
			console.log(error);
			dispatch(setErrors(error as string));
		}
	};
};
