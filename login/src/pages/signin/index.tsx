import React, { SyntheticEvent } from 'react';
import Button from '../../components/button';
import Container from '../../components/container';
import { InputLogin } from '../../components/input';
import { formData } from './FormData';
import './signIn.css';
import SideImage from '../../assets/img/side-image.jpg';
import { useForm, Resolver } from 'react-hook-form';
import axios from 'axios';
import mode from '../../settings/settings';

export interface ICredentials {
	email: string;
	password: string;
}

const resolver: Resolver<ICredentials> = async (values) => {
	return {
		values: values.email ? values : {},
		errors: !values.password
			? { email: { type: 'required', message: 'This is required.' } }
			: {},
	};
};

const SignIn = ({ onSignIn }: any) => {
	const { username, password, loginButton, signupButton, title, description } = formData;
	const {
		register,
		formState: { errors },
	} = useForm<ICredentials>({ resolver });

	const dummyData = {
		email: 'osmar.ugarte@fundacion-jala.org',
		password: 'Admin12345',
	};
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const url = mode(process.env.MODE);
		console.log('url =>' + url);
		axios
			.post(`${url}authentication/login`, dummyData)
			.then((res) => {
				localStorage.setItem('token', res.data.data[0]);
				onSignIn();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='login-page'>
			<Container>
				<>
					<form className='login-form' onSubmit={handleSubmit}>
						<InputLogin className='input-login' placeholder={username} />
						<InputLogin className='input-login' placeholder={password} />
						{errors?.password && <p>{errors.password.message}</p>}
						<Button value={loginButton} className='login' />
						<div className='h-line'></div>
						<a className='forgot-password-link'>Forgot Password?</a>
						<Button value={signupButton} className='sing-up' />
					</form>
					<div className='side-image-container'>
						<img className='side-image' src={SideImage} alt='side image' />
						<div className='side-image-title'>{title}</div>
						<div className='side-image-description'>{description}</div>
					</div>
				</>
			</Container>
		</div>
	);
};

export default SignIn;
