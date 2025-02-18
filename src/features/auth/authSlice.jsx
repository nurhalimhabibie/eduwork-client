import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const storedToken = localStorage.getItem('accessToken');

const initialState = {
	isLoggedIn: storedToken ? true : false,
	user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload.user;
			localStorage.setItem('user', JSON.stringify(action.payload.user));
			localStorage.setItem('accessToken', action.payload.token);
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.user = null;
			localStorage.removeItem('user');
			localStorage.removeItem('accessToken');
		},
	},
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
