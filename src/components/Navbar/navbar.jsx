import React, { useEffect, useState } from 'react';
import Button from '../Button/button';
import './navbarStyle.css';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveMenu, selectActiveMenu } from '../../features/menu/menuSlice';
import { IoCartOutline } from 'react-icons/io5';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectTotalItemCart } from '../../features/cart/cartSlice';
import CartComponent from '../Modal/cartModal';

const Navbar = () => {
	const activeMenu = useSelector(selectActiveMenu);
	const totalCartItems = useSelector(selectTotalItemCart);
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [isLoginPage, setIsLoginPage] = useState(false);
	const [showCart, setShowCart] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		const userData = localStorage.getItem('user');
		if (token && userData) {
			try {
				setIsUserLoggedIn(true);
				setUser(JSON.parse(userData));
			} catch (error) {
				console.error('Error parsing user data from localStorage', error);
			}
		}
	}, []);

	useEffect(() => {
		setIsLoginPage(
			location.pathname === '/login' || location.pathname === '/register',
		);
	}, [location]);

	const handleClick = (menu) => {
		dispatch(setActiveMenu(menu));
	};

	const handleLogout = async () => {
		try {
			localStorage.removeItem('accessToken');
			localStorage.removeItem('user');
			setIsUserLoggedIn(false);
			setUser(null);
			navigate('/');
		} catch (err) {
			alert('Logout failed: ' + err.message);
		}
	};

	const handleShowCart = () => {
		setShowCart(true);
	};

	const handleCloseCart = () => {
		setShowCart(false);
	};

	return (
		<nav className="navbar navbar-expand-lg fixed-top">
			<div className="container">
				<Link
					className="navbar-brand"
					to="/#home"
					onClick={() => handleClick('home')}
				>
					<span>Store</span>ID
				</Link>
				{isUserLoggedIn && (
					<li className="ms-auto me-2 d-flex align-items-center d-lg-none">
						<button className="btnIcon mx-2" onClick={handleShowCart}>
							<IoCartOutline className="icon-cart" />
							<div className="nav-cart-count">{totalCartItems}</div>
						</button>
					</li>
				)}
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav mx-auto">
						{!isLoginPage && (
							<>
								<li onClick={() => handleClick('home')} className="nav-item">
									<Link
										className={
											activeMenu === 'home'
												? 'nav-link mx-2 active'
												: 'nav-link mx-2'
										}
										to="/#home"
									>
										Home
									</Link>
								</li>
								<li onClick={() => handleClick('category')} className="nav-item">
									<Link
										className={
											activeMenu === 'category'
												? 'nav-link mx-2 active'
												: 'nav-link mx-2'
										}
										to="/#category"
									>
										Category
									</Link>
								</li>
								<li onClick={() => handleClick('product')} className="nav-item">
									<Link
										className={
											activeMenu === 'product'
												? 'nav-link mx-2 active'
												: 'nav-link mx-2'
										}
										to="/#product"
									>
										Product
									</Link>
								</li>
							</>
						)}
						{isUserLoggedIn && (
							<li className="d-lg-flex align-items-center d-none">
								<button className="btnIcon mx-2" onClick={handleShowCart}>
									<IoCartOutline className="icon-cart" />
									<div className="nav-cart-count">{totalCartItems}</div>
								</button>
							</li>
						)}
					</ul>
					{!isLoginPage && (
						<div className="d-flex mt-lg-0 mt-5">
							{isUserLoggedIn ? (
								<Button click={handleLogout} variants="primaryBtn">
									Logout
								</Button>
							) : (
								<Link to="/login">
									<Button variants="primaryBtn">Login</Button>
								</Link>
							)}
						</div>
					)}
				</div>
			</div>
			<CartComponent show={showCart} handleClose={handleCloseCart} />
		</nav>
	);
};

export default Navbar;
