import React from 'react';
import './formRegisterStyle.css';
import Button from '../../components/Button/button';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const Register = () => {
	return (
		<div className="formRegister">
			<div className="wrapper">
				<form action="">
					<h1>Registration</h1>
					<div className="input-box">
						<input type="text" placeholder="Username" required />
						<FaUser className="icon" />
					</div>
					<div className="input-box">
						<input type="email" placeholder="Email" required />
						<FaEnvelope className="icon" />
					</div>
					<div className="input-box">
						<input type="password" placeholder="Password" required />
						<FaLock className="icon" />
					</div>
					<div className="remember-forgot">
						<label htmlFor="">
							<input type="checkbox" />I agree to the terms & conditions
						</label>
					</div>
					<Button variants="w-100 primaryBtn">Register</Button>
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
