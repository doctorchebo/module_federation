import React, { SyntheticEvent } from 'react';
import Button from '../../components/button';
import Container from '../../components/container';
import { InputLogin } from '../../components/input';
import { formData } from './FormData';
import './signIn.css';
import SideImage from '../../assets/img/side-image.jpg';
import { useForm, Resolver } from 'react-hook-form';
import { Form, Grid, Image } from 'semantic-ui-react';
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
				<Grid doubling={true} relaxed={true} stretched columns={2}>
					<Grid.Row centered verticalAlign='middle'>
						<Grid.Column width={4} verticalAlign='middle'>
							<Form className='login-form' onSubmit={handleSubmit}>
								<Form.Field width={16}>
									<InputLogin className='input-login' placeholder={username} />
								</Form.Field>
								<Form.Field width={16}>
									<InputLogin className='input-login' placeholder={password} />
								</Form.Field>
								{errors?.password && <p>{errors.password.message}</p>}
								<Button value={loginButton} className='login' />
								<div className='h-line' />
								<Form.Field>
									<a className='forgot-password-link'>Forgot Password?</a>
								</Form.Field>
								<Button value={signupButton} className='sing-up' />
							</Form>
						</Grid.Column>
						<Grid.Column width={5}>
							{/* <div className='side-image-container'> */}
							<Image src={SideImage} alt='side image' fluid rounded />
							<div className='side-image-title'>{title}</div>
							<div className='side-image-description'>{description}</div>
							{/* </div> */}
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</div>
	);
};

export default SignIn;
