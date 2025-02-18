import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	cart: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const newItem = action.payload;
			const indexProduct = state.cart.findIndex(
				(item) => item.product._id === newItem.product._id,
			);

			if (indexProduct !== -1) {
				state.cart[indexProduct].qty += 1;
				state.cart[indexProduct].totalPrice =
					state.cart[indexProduct].qty * newItem.price;
			} else {
				state.cart.push({
					...newItem,
					qty: 1,
					totalPrice: newItem.price,
				});
			}
		},
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter((item) => item.product._id !== action.payload);
		},
		clearCart: (state) => {
			state.cart = [];
		},
		addQuantityItemsCart: (state, action) => {
			const selectItem = action.payload;
			const indexProduct = state.cart.findIndex(
				(item) => item.product._id === selectItem.product._id,
			);

			state.cart[indexProduct].qty += 1;
			state.cart[indexProduct].totalPrice =
				state.cart[indexProduct].qty * selectItem.price;
		},
		minusQuantityItemsCart: (state, action) => {
			const selectItem = action.payload;
			const indexProduct = state.cart.findIndex(
				(item) => item.product._id === selectItem.product._id,
			);

			if (state.cart[indexProduct].qty > 1) {
				state.cart[indexProduct].qty -= 1;
				state.cart[indexProduct].totalPrice =
					state.cart[indexProduct].qty * selectItem.price;
			} else {
				const updatedCart = state.cart.filter(
					(item) => item.product._id === selectItem.product._id,
				);
				state.cart = updatedCart;
			}
		},
		changeQuantityItemsCart: (state, action) => {
			const item = action.payload;

			if (item && item.newQuantity >= 1) {
				const indexProduct = state.cart.findIndex(
					(item) => item.product._id === item.product._id,
				);

				if (indexProduct !== -1) {
					state.cart[indexProduct].qty += item.newQuantity;
					state.cart[indexProduct].totalPrice =
						state.cart[indexProduct].qty * state.cart[indexProduct].price;
				} else {
					state.cartItems.push({
						...item.product,
						qty: item.newQuantity,
						totalPrice: item.newQuantity * item.product.price,
					});
				}
			}
		},
		setStatus: (state, action) => {
			state.status = action.payload;
		},
		setError: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	clearCart,
	addQuantityItemsCart,
	minusQuantityItemsCart,
	changeQuantityItemsCart,
	setStatus,
	setError,
} = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectTotalItemCart = (state) => {
	return state.cart.cart.reduce((total, item) => total + item.qty, 0);
};
export const selectTotalPrice = (state) =>
	state.cart.cart.reduce((total, item) => total + item.qty * item.product.price, 0);
export const selectStatus = (state) => state.cart.status;
export const selectError = (state) => state.cart.error;

export default cartSlice.reducer;
