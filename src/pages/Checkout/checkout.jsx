import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectCart,
	selectTotalPrice,
	clearCart,
	removeFromCart,
	addQuantityItemsCart,
	minusQuantityItemsCart,
	changeQuantityItemsCart,
} from '../../features/cart/cartSlice';
import './checkoutStyle.css';
import { FaTrash, FaMinusCircle, FaPlusCircle } from 'react-icons/fa';

const Checkout = () => {
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	const totalPrice = useSelector(selectTotalPrice);

	const handleRemoveFromCart = (productId) => {
		dispatch(removeFromCart(productId));
	};

	const handleChangeItemCart = (product, operator) => {
		if (operator === 'add') {
			dispatch(addQuantityItemsCart(product));
		} else {
			dispatch(minusQuantityItemsCart(product));
		}
	};

	const handleQuantityChange = (product, newQuantity) => {
		dispatch(changeQuantityItemsCart({ product, newQuantity }));
	};

	const handleCheckout = () => {
		alert('Checkout successful');
		dispatch(clearCart());
	};

	return (
		<div className="checkout-container">
			<div className="checkout-left">
				<h2>Order Summary</h2>
				{cart.length ? (
					cart.map((item) => (
						<div key={item.product._id} className="checkout-item">
							<img
								src={`http://localhost:5000/images/products/${item.product.image_url}`}
								alt={item.product.name}
							/>
							<div className="item-details">
								<h4>{item.product.name}</h4>
								<p>${item.product.price}</p>
								<div className="d-flex flex-row align-items-center justify-content-between gap-10 gap-md-0">
									<div className="quantity-control d-flex flex-row justify-content-between">
										<button
											type="button"
											onClick={() => handleChangeItemCart(item, 'minus')}
											className="cartBtn"
										>
											<FaMinusCircle style={{ width: '1.3rem', height: '1.3rem' }} />
										</button>
										<div
											className="d-flex justify-content-center align-items-center border border-gray-900 bg-white rounded-md p-2"
											style={{ height: '2rem', width: '5rem' }}
										>
											<input
												type="number"
												value={item.qty}
												onChange={(e) =>
													handleQuantityChange(item.product, Number(e.target.value))
												}
												className="w-100 h-100 text-center bg-transparent border-0"
												style={{ fontSize: '1rem' }}
											/>
										</div>
										<button
											type="button"
											onClick={() => handleChangeItemCart(item, 'add')}
											className="cartBtn"
										>
											<FaPlusCircle style={{ width: '1.3rem', height: '1.3rem' }} />
										</button>
									</div>
									<button
										type="button"
										className="d-flex justify-content-center align-items-center cartBtn"
										onClick={() => handleRemoveFromCart(item.product._id)}
									>
										<FaTrash
											className="text-danger"
											style={{ width: '1.3rem', height: '1.3rem' }}
										/>
									</button>
								</div>
							</div>
						</div>
					))
				) : (
					<p>Your cart is empty</p>
				)}
				<h3>Total: ${totalPrice}</h3>
			</div>
			<div className="checkout-right">
				<h2>Shipping Information</h2>
				<form>
					<label htmlFor="name">Full Name</label>
					<input type="text" id="name" name="name" required />
					<label htmlFor="address">Address</label>
					<input type="text" id="address" name="address" required />
					<label htmlFor="city">City</label>
					<input type="text" id="city" name="city" required />
					<label htmlFor="state">State</label>
					<input type="text" id="state" name="state" required />
					<label htmlFor="zip">Zip Code</label>
					<input type="text" id="zip" name="zip" required />
					<h2>Payment Information</h2>
					<label htmlFor="card-name">Name on Card</label>
					<input type="text" id="card-name" name="card-name" required />
					<label htmlFor="card-number">Card Number</label>
					<input type="text" id="card-number" name="card-number" required />
					<label htmlFor="expiry">Expiry Date</label>
					<input type="text" id="expiry" name="expiry" required />
					<label htmlFor="cvv">CVV</label>
					<input type="text" id="cvv" name="cvv" required />
					<button type="button" onClick={handleCheckout}>
						Buy
					</button>
				</form>
			</div>
		</div>
	);
};

export default Checkout;
