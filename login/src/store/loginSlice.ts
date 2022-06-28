import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
