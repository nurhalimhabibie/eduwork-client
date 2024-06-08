import React from 'react';
import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Layout from './layouts';

const routes = () => {
	return [
		{
			path: '/',
			element: <Layout />,
			children: [
				{
					path: '',
					element: <Home />,
				},
				{
					path: 'login',
					element: <Login />,
				},
				{
					path: 'register',
					element: <Register />,
				},
			],
		},
	];
};

export default routes;
