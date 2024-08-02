import React, { useEffect, useState } from 'react';
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
import axiosInstance from '../../axiosInstance';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Checkout = () => {
	const { order_id } = useParams();
	const dispatch = useDispatch();
	const cart = useSelector(selectCart);
	const totalPrice = useSelector(selectTotalPrice);
	const [shippingInfo, setShippingInfo] = useState({
		fullName: '',
		fullStreet: '',
		provinsi: '',
		kabupaten: '',
		kecamatan: '',
		kelurahan: '',
		phoneNumber: '',
	});
	const [selectedBank, setSelectedBank] = useState('');
	const [invoice, setInvoice] = useState(null);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		const fetchInvoice = async () => {
			try {
				const response = await axiosInstance.get(`/api/invoices/${order_id}`);
				setInvoice(response.data);
				console.log(response.data);
			} catch (error) {
				console.error('Error fetching invoice:', error);
				alert('Failed to fetch invoice');
			}
		};

		if (order_id) {
			fetchInvoice();
		}
	}, [order_id]);

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

	const handleInputChange = (e, setFunction) => {
		const { name, value } = e.target;
		setFunction((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleCheckout = async () => {
		const orderData = {
			delivery_address: shippingInfo,
			delivery_courier: 'JNE', // Misal kita hardcode untuk sekarang
			delivery_fee: 10000, // Contoh biaya pengiriman
			paymentMethod: selectedBank, // Misal kita hardcode untuk sekarang
			order_items: cart.map((item) => ({
				name: item.product.name,
				product: item.product._id,
				qty: item.qty,
				price: item.product.price,
			})),
			totalShopping: totalPrice, // Total harga + biaya pengiriman
		};
		console.log('Order Data:', orderData);

		try {
			const response = await axiosInstance.post('/api/orders', orderData);
			dispatch(clearCart());
			const invoice = response.data;
			setInvoice(invoice);
			setShowModal(true);
			// 	console.log('Invoice Data:', invoice);
			// 	alert(`
			// 	Invoice Information
			// 	===================
			// 	Order Number: ${invoice.order_number}
			// 	Total Price: Rp.${invoice.totalShopping}
			// 	Delivery Courier: ${invoice.delivery_courier}
			// 	Delivery Fee: Rp.${invoice.delivery_fee}
			// 	Payment Method: ${invoice.paymentMethod}

			// 	Shipping Address
			// 	----------------
			// 	Name: ${invoice.delivery_address.fullName}
			// 	Street: ${invoice.delivery_address.fullStreet}
			// 	Provinsi: ${invoice.delivery_address.provinsi}
			// 	Kabupaten: ${invoice.delivery_address.kabupaten}
			// 	Kecamatan: ${invoice.delivery_address.kecamatan}
			// 	Kelurahan: ${invoice.delivery_address.kelurahan}
			// 	Phone Number: ${invoice.delivery_address.phoneNumber}
			// `);
		} catch (error) {
			console.error('Error during checkout:', error);
			alert('Checkout failed');
		}
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
					<label htmlFor="fullName">Full Name</label>
					<input
						type="text"
						id="fullName"
						name="fullName"
						value={shippingInfo.fullName}
						onChange={(e) => handleInputChange(e, setShippingInfo)}
						required
					/>
					<label htmlFor="fullStreet">Address</label>
					<input
						type="text"
						id="fullStreet"
						name="fullStreet"
						value={shippingInfo.fullStreet}
						onChange={(e) => handleInputChange(e, setShippingInfo)}
						required
					/>
					<label htmlFor="provinsi">Provinsi</label>
					<input
						type="text"
						id="provinsi"
						name="provinsi"
						value={shippingInfo.provinsi}
						onChange={(e) => handleInputChange(e, setShippingInfo)}
						required
					/>
					<label htmlFor="kabupaten">Kabupaten</label>
					<input
						type="text"
						id="kabupaten"
						name="kabupaten"
						value={shippingInfo.kabupaten}
						onChange={(e) => handleInputChange(e, setShippingInfo)}
						required
					/>
					<label htmlFor="kecamatan">Kecamatan</label>
					<input
						type="text"
						id="kecamatan"
						name="kecamatan"
						value={shippingInfo.kecamatan}
						onChange={(e) => handleInputChange(e, setShippingInfo)}
						required
					/>
					<label htmlFor="kelurahan">Kelurahan</label>
					<input
						type="text"
						id="kelurahan"
						name="kelurahan"
						value={shippingInfo.kelurahan}
						onChange={(e) => handleInputChange(e, setShippingInfo)}
						required
					/>
					<label htmlFor="phoneNumber">Phone Number</label>
					<input
						type="text"
						id="phoneNumber"
						name="phoneNumber"
						value={shippingInfo.phoneNumber}
						onChange={(e) => handleInputChange(e, setShippingInfo)}
						required
					/>
					<h2>Payment Information</h2>
					<label htmlFor="bank">Select Bank</label>
					<select
						id="bank"
						name="bank"
						value={selectedBank}
						onChange={(e) => setSelectedBank(e.target.value)}
						required
					>
						<option value="" disabled>
							Select your bank
						</option>
						<option value="Bank BCA">Bank BCA</option>
						<option value="Bank BRI">Bank BRI</option>
						<option value="Bank BSI">Bank BSI</option>
						<option value="Bank Mandiri">Bank Mandiri</option>
					</select>
					<button type="button" onClick={handleCheckout}>
						Pesan
					</button>
				</form>
			</div>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Invoice Information</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{invoice && (
						<>
							<p>Order Number: {invoice.order_number}</p>
							<p>Total Price: Rp.{invoice.totalShopping}</p>
							<p>Delivery Courier: {invoice.delivery_courier}</p>
							<p>Delivery Fee: Rp.{invoice.delivery_fee}</p>
							<p>Payment Method: {invoice.paymentMethod}</p>
							<h5>Shipping Address</h5>
							<p>Name: {invoice.delivery_address.fullName}</p>
							<p>Street: {invoice.delivery_address.fullStreet}</p>
							<p>Provinsi: {invoice.delivery_address.provinsi}</p>
							<p>Kabupaten: {invoice.delivery_address.kabupaten}</p>
							<p>Kecamatan: {invoice.delivery_address.kecamatan}</p>
							<p>Kelurahan: {invoice.delivery_address.kelurahan}</p>
							<p>Phone Number: {invoice.delivery_address.phoneNumber}</p>
						</>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Checkout;
