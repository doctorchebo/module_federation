import React, { ChangeEvent, FormEvent, useState } from 'react';
import Button from '../../components/button';
import Container from '../../components/container';
import { InputLogin } from '../../components/input';
import { formData } from './FormData';
import './signIn.css';
import SideImage from '../../assets/img/side-image.jpg';
import { Form, Grid, Image, Message, FormProps } from 'semantic-ui-react';
import axios from 'axios';
import mode from '../../settings/settings';
import { validateFields } from '../../helpers/validations';

export interface ICredentials {
	username: string;
	password: string;
}
export interface ErrorInterface {
	username: { message: string; foundError: boolean };
	password: { message: string; foundError: boolean };
}

export interface validationReponse {
	type: string;
	msg: string;
}

const SignIn = ({ onSignIn }: any) => {
	const { username, password, loginButton, signupButton, title, description } = formData;
	const initialErrorState: ErrorInterface = {
		username: { message: '', foundError: false },
		password: { message: '', foundError: false },
	};
	const initialInputState: ICredentials = {
		username: '',
		password: '',
	};
	const [inputState, setState] = useState(initialInputState);
	const [errors, setErrors] = useState(initialErrorState);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const name = event.target.name;
		setState((values) => ({ ...values, [name]: value }));
		if (event.target.validity.valid) {
			validateForm(validateFields(name, value));
		}
	};

	const validateForm = (error: validationReponse) => {
		if (error.msg !== '') {
			setErrors((values) => ({
				...values,
				[error.type]: { message: error.msg, foundError: true },
			}));
		} else {
			setErrors((values) => ({
				...values,
				[error.type]: { message: '', foundError: false },
			}));
		}
	};

	const handleSubmit = (event: FormEvent, data: FormProps) => {
		event.preventDefault();
		console.log(event.currentTarget);
		if (!errors.username.foundError && !errors.password.foundError) {
			const submitData = {
				email: inputState.username,
				password: inputState.password,
			};
			const url = mode(process.env.MODE);
			console.log('url =>' + url);
			axios
				.post(`${url}authentication/login`, submitData)
				.then((res) => {
					localStorage.setItem('token', res.data.data[0]);
					onSignIn();
				})
				.catch((error) => {
					throw new error(error);
				});
		}
	};

	return (
		<div className='login-page'>
			<Container>
				<Grid doubling={true} relaxed={true} stretched columns={2}>
					<Grid.Row centered verticalAlign='middle'>
						<Grid.Column width={4} verticalAlign='middle'>
							<input type='hidden' value='something' />
							<Form
								as='form'
								className='login-form'
								error
								onSubmit={handleSubmit}
								onChange={handleChange}
								autoComplete='off'
							>
								<Form.Field width={16}>
									<InputLogin
										placeholder={username}
										type='text'
										autoComplete='off'
									/>
								</Form.Field>
								{errors?.username.foundError && (
									<Message negative>
										<Message.Header>{errors.username.message}</Message.Header>
									</Message>
								)}
								<Form.Field width={16}>
									<InputLogin
										placeholder={password}
										type='password'
										autoComplete='off'
									/>
								</Form.Field>
								{errors?.password.foundError && (
									<Message negative>
										<Message.Header>{errors.password.message}</Message.Header>
									</Message>
								)}
								<Button value={loginButton} className='login' />
								<div className='h-line' />
								<Form.Field>
									<a className='forgot-password-link'>Forgot Password?</a>
								</Form.Field>
								<Button value={signupButton} className='sing-up' />
							</Form>
						</Grid.Column>
						<Grid.Column width={5}>
							<Image src={SideImage} alt='side image' fluid rounded />
							<div className='side-image-title'>{title}</div>
							<div className='side-image-description'>{description}</div>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</div>
	);
};

export default SignIn;
