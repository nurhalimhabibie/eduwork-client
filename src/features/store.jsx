import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import loadingReducer from './loading/loadingSlice';
import menuReducer from './menu/menuSlice';
import cartReducer from './cart/cartSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		loading: loadingReducer,
		menu: menuReducer,
		cart: cartReducer,
	},
});
console.log('oncreate store : ', store.getState());

store.subscribe(() => {
	console.log('STORE CHANGE : ', store.getState());
});

export default store;
