import React from 'react';
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

const AppRoutes = () => {
	const routing = useRoutes(routes());
	return routing;
};

function App() {
	return <AppRoutes />;
}

export default App;
