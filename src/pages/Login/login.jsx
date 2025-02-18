import React, { useState } from 'react';
import './formLoginStyle.css';
import Button from '../../components/Button/button';
import { FaUser, FaLock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { login } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post('/auth/login', { email, password });
			console.log('Response Data:', response.data);

			const { token, user } = response.data;

			if (!token || !user) {
				throw new Error('Token atau user tidak ditemukan dalam response.');
			}
			localStorage.setItem('accessToken', token);
			localStorage.setItem('user', JSON.stringify(user));
			dispatch(login({ user, token }));
			navigate('/');
		} catch (err) {
			console.error('Login failed:', err.response?.data);
			alert('Login failed: ' + err.response.data.message);
		}
	};

	return (
		<div className="login">
			<div className="wrapper">
				<form onSubmit={handleSubmit}>
					<h1>Login</h1>
					<div className="input-box">
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={handleEmailChange}
							required
						/>
						<FaUser className="icon" />
					</div>
					<div className="input-box">
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={handlePasswordChange}
							required
						/>
						<FaLock className="icon" />
					</div>
					<div className="remember-forgot">
						<label htmlFor="rememberMe">
							<input type="checkbox" id="rememberMe" />
							Remember me
						</label>
						<a href="#">Forgot password</a>
					</div>
					<Button type="submit" variants="w-100 primaryBtn">
						Login
					</Button>
					<div className="register-link">
						<p>
							Don't have an account? <a href="register">Register</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
