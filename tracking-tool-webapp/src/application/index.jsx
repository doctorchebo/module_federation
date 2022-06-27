import React from 'react';
import { useLocation } from 'react-router-dom';
import { useApplication } from 'application/context/AppContext';
import Home from 'pages/home/index';
import FactoryRoutes from './routes';
import Login from 'pages/login';
import { Role } from '../helpers/role';
import Dashboard from 'pages/dashboard';
import ResetPassword from 'pages/resetPasswordPages/resetPassword';
import { SemanticToastContainer } from 'react-semantic-toasts';
import 'react-semantic-toasts/styles/react-semantic-alert.css';
import VerifyEmail from 'pages/resetPasswordPages/verifyEmail';
import { useLoginStore } from 'app2/store';
export const Application = () => {
	const { loginState } = useLoginStore();
	console.log('The shared state is: ' + JSON.stringify(loginState));
	const [state] = useApplication();
	const { pathname } = useLocation();
	const currentRoles = Object.values(Role);
	const PAGES = [
		{ name: 'home', link: '/', component: Home },
		{ name: 'login', link: '/login', component: Login },
		{ name: 'reset-password', link: '/reset-password', component: ResetPassword },
		{ name: 'verify-email', link: '/verify-email', component: VerifyEmail },
		{
			name: 'dashboard',
			link: '/dashboard',
			component: Dashboard,
			protected: true,
			roles: currentRoles,
		},
	];

	return (
		<>
			<FactoryRoutes items={PAGES} state={state} pathname={pathname} />
			<SemanticToastContainer position='bottom-right' />
		</>
	);
};

export default Application;
