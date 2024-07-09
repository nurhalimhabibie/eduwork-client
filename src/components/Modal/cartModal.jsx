import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, updateCartItems } from '../../services/cartService';
import {
	selectCart,
	selectTotalItemCart,
	selectTotalPrice,
	removeFromCart,
	clearCart,
	addQuantityItemsCart,
	minusQuantityItemsCart,
	setStatus,
	setError,
	selectStatus,
	selectError,
	changeQuantityItemsCart,
} from '../../features/cart/cartSlice';
import Button from '../Button/button';
import { IoCloseOutline } from 'react-icons/io5';
import { FaTrash, FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import './cartStyle.css';
import { Link } from 'react-router-dom';

const CartComponent = ({ show, handleClose }) => {
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	const totalItems = useSelector(selectTotalItemCart);
	const totalPrice = useSelector(selectTotalPrice);
	const status = useSelector(selectStatus);
	const error = useSelector(selectError);

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setStatus('loading'));
			try {
				const cartData = await fetchCartItems();
				dispatch(setStatus('succeeded'));
			} catch (error) {
				dispatch(setError(error.toString()));
				dispatch(setStatus('failed'));
			}
		};

		fetchData();
	}, [dispatch]);

	const handleCheckout = async () => {
		try {
			await updateCartItems(cart);
			// alert('Checkout successful');
		} catch (error) {
			console.error('Error during checkout:', error);
		}
	};

	const handleClearCart = () => {
		dispatch(clearCart());
	};

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

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (status === 'failed') {
		return <div>Error: {error}</div>;
	}

	return (
		<div
			className={`modal fade ${show ? 'show' : ''}`}
			style={{ display: show ? 'block' : 'none' }}
			tabIndex="-1"
			aria-labelledby="cartModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content  d-flex flex-column gap-3 p-1">
					<div className="position-relative py-2 w-100 d-flex justify-content-center align-items-center text-center">
						<h3
							className="text-uppercase font-weight-semibold tracking-wider"
							style={{ fontSize: '1.5rem', lineHeight: '1.5rem' }}
						>
							Shopping cart
						</h3>
						<button
							type="button"
							onClick={handleClose}
							className="position-absolute"
							style={{
								top: '0',
								right: '0',
								width: '1.5rem',
								height: '1.5rem',
								borderRadius: '0.5rem',
							}}
						>
							<IoCloseOutline className="w-100 h-100" />
						</button>
					</div>
					{cart.length ? (
						<>
							<div
								className="d-flex flex-column gap-3 py-2"
								style={{ maxHeight: '250px', overflow: 'auto' }}
							>
								{cart.map((item) => {
									return (
										<div
											key={item.product._id}
											className="w-100 border-bottom border-4 border-gray-200 py-1 px-4"
										>
											<div className="d-flex flex-column flex-md-row gap-4 align-items-center w-100">
												<div
													className="w-100"
													style={{ maxWidth: '100px', overflow: 'hidden' }}
												>
													<img
														src={`http://localhost:5000/images/products/${item.product.image_url}`}
														alt={item.product.name}
														className="w-100 h-100 object-cover"
													/>
												</div>
												<div
													className="w-100 d-flex flex-column align-items-start"
													style={{ maxWidth: '90%' }}
												>
													<h3
														className="text-capitalize font-weight-medium text-clip"
														style={{ fontSize: '1rem' }}
													>
														{item.product.name}
													</h3>
													<div className="d-flex align-items-center mt-2 mt-md-1">
														<h4
															className="font-weight-bold"
															style={{ fontSize: '1.1rem' }}
														>
															$ {item.product.price}
														</h4>
													</div>
													<div className="mt-1 w-100 d-flex flex-row align-items-center justify-content-between gap-10 gap-md-0">
														<div className="d-flex flex-row gap-1 justify-content-center align-items-center">
															<button
																type="button"
																onClick={() => handleChangeItemCart(item, 'minus')}
																className="cartBtn"
															>
																<FaMinusCircle
																	style={{ width: '1.3rem', height: '1.3rem' }}
																/>
															</button>
															<div
																className="d-flex justify-content-center align-items-center border border-gray-900 bg-white rounded-md p-2"
																style={{ height: '2rem', width: '5rem' }}
															>
																<input
																	type="number"
																	value={item.qty}
																	onChange={(e) =>
																		handleQuantityChange(
																			item.product,
																			Number(e.target.value),
																		)
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
																<FaPlusCircle
																	style={{ width: '1.3rem', height: '1.3rem' }}
																/>
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
										</div>
									);
								})}
							</div>
							<div className="w-100 p-1 p-md-3">
								<div className="w-100 h-100 rounded-xl px-1 px-md-3 py-3 py-md-3 bg-light d-flex flex-column gap-2 align-items-center">
									<h3
										className="text-uppercase font-weight-semibold tracking-wider"
										style={{ fontSize: '1.5rem', lineHeight: '1.5rem' }}
									>
										Shopping Summary
									</h3>
									<div className="mt-2 w-100 w-md-50 d-flex flex-row justify-content-between">
										<h5 className="text-base md:text-lg font-medium">
											Total Price ({totalItems} items) :
										</h5>
										<h5 className="text-lg md:text-xl font-semibold">
											$ {totalPrice}
										</h5>
									</div>
									<hr
										className="my-2 my-md-3 w-100 w-md-50"
										style={{ height: '2px', backgroundColor: 'gray' }}
									/>
									<div className="w-100 w-md-50 d-flex flex-row justify-content-between">
										<h5 className="text-base md:text-lg font-bold md:font-extrabold">
											Grand Total :
										</h5>
										<h5 className="text-lg md:text-xl font-bold md:font-extrabold">
											$ {totalPrice}
										</h5>
									</div>
								</div>
							</div>
							<div className="d-flex flex-column flex-md-row align-items-center justify-content-between px-3 gap-3">
								<a href="/#product">
									<span
										className="text-muted text-body custom-tracking-wide text-decoration-underline"
										style={{ cursor: 'pointer' }}
										onClick={handleClose}
									>
										Continue Shopping
									</span>
								</a>
								<div className="d-flex gap-3 py-2">
									<Button click={handleClearCart} variants="secondaryBtn">
										Clear Cart
									</Button>
									<Link to="/checkout">
										<Button click={handleCheckout} variants="primaryBtn">
											Checkout
										</Button>
									</Link>
								</div>
							</div>
						</>
					) : (
						<div className="d-flex flex-column justify-content-center align-items-center p-1">
							<h4 className="text-muted text-center custom-tracking-wide fst-italic pb-4">
								Your Cart is Empty
							</h4>
							<Link to="/#product">
								<Button click={handleClose} variants="primaryBtn text-uppercase">
									Shop Now
								</Button>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CartComponent;
