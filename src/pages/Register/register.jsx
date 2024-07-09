import React, { useState } from 'react';
import './formRegisterStyle.css';
import Button from '../../components/Button/button';
import { FaUser, FaLock, FaEnvelope, FaPhone } from 'react-icons/fa';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

const Register = () => {
	const [full_name, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const navigate = useNavigate();

	const handleFullNameChange = (e) => setFullName(e.target.value);
	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
	const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}
		try {
			await axiosInstance.post('/auth/register', {
				full_name,
				email,
				password,
				phoneNumber,
			});
			alert('Registration successful!');
			navigate('/login');
		} catch (err) {
			alert('Registration failed: ' + (err.response?.data?.message || err.message));
		}
	};

	return (
		<div className="formRegister">
			<div className="wrapper">
				<form onSubmit={handleSubmit}>
					<h1>Registration</h1>
					<div className="input-box">
						<input
							type="text"
							placeholder="Full Name"
							value={full_name}
							onChange={handleFullNameChange}
							required
							minLength="3"
							maxLength="255"
						/>
						<FaUser className="icon" />
					</div>
					<div className="input-box">
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={handleEmailChange}
							required
							maxLength="255"
						/>
						<FaEnvelope className="icon" />
					</div>
					<div className="input-box">
						<input
							type="text"
							placeholder="Phone Number"
							value={phoneNumber}
							onChange={handlePhoneNumberChange}
							required
							minLength="9"
							maxLength="15"
						/>
						<FaPhone className="icon" />
					</div>
					<div className="input-box">
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={handlePasswordChange}
							required
							maxLength="255"
						/>
						<FaLock className="icon" />
					</div>
					<div className="input-box">
						<input
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={handleConfirmPasswordChange}
							required
							maxLength="255"
						/>
						<FaLock className="icon" />
					</div>
					<div className="remember-forgot">
						<label htmlFor="">
							<input type="checkbox" />I agree to the terms & conditions
						</label>
					</div>
					<Button type="submit" variants="w-100 primaryBtn">
						Register
					</Button>
					<div className="register-link">
						<p>
							Already have an account? <a href="login">Login</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
