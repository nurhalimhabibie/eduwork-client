import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	auth: {
		isLoggedIn: false,
		user: null,
	},
	loading: false,
	activeMenu: 'home',
	cart: [],
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLoggedIn = true;
			state.user = action.payload;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.user = null;
		},
	},
});

export const loadingSlice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
	},
});

export const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setActiveMenu: (state, action) => {
			state.activeMenu = action.payload;
		},
	},
});

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.cart.push(action.payload);
		},
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter((item) => item.id !== action.payload);
		},
	},
});

export const { login, logout } = authSlice.actions;
export const { setLoading } = loadingSlice.actions;
export const { setActiveMenu } = menuSlice.actions;
export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectLoading = (state) => state.loading;
export const selectActiveMenu = (state) => state.menu.activeMenu;
export const selectCart = (state) => state.cart.cart;

export default {
	auth: authSlice.reducer,
	loading: loadingSlice.reducer,
	menu: menuSlice.reducer,
	cart: cartSlice.reducer,
};
