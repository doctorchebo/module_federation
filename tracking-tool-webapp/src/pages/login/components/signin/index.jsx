import { PropTypes } from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';
import { InputLogin } from '../input';
import React, { useState } from 'react';
import { isErrorsSignIn, validateEmail } from '../../helpers/validators';
import MessageLogin from '../message';
import locale from '../../locale/en.json';
import Button from 'components/button';
import { useSessionStore } from 'store/sessionSlice/useSessionStore';
import { Link } from 'react-router-dom';
/**
 * @param {*} props -
 * @returns {React.Component} -
 */
export default function SignIn(props) {
	const [errors, setErrors] = useState({});
	const [hide, setHide] = useState(true);
	const [user, setUser] = useState({});
	const { form } = locale;
	const { onLoadSignIn } = useSessionStore();
	const validateForm = (input, data, error) => {
		if (error) {
			setErrors({ ...errors, [input]: error });
			setUser({ ...user, [input]: data });
		} else {
			setUser({ ...user, [input]: data });
			setErrors({ ...errors, [input]: [] });
		}
	};
	const handleSubmit = () => {
		if (!isErrorsSignIn(errors)) {
			props.onLogin(user);
			onLoadSignIn(user);
		}
	};

	return (
		<Form onSubmit={handleSubmit}>
			<InputLogin
				className='input-login'
				icon={<Icon name='user' />}
				iconPosition='left'
				placeholder={form.userField}
				validate={(data) => validateForm('email', data, validateEmail(data))}
			/>
			<MessageLogin value={errors.email} />
			<InputLogin
				className='input-login'
				type={hide ? 'password' : ''}
				placeholder={form.passwordField}
				icon={<Icon name='eye' link onClick={() => setHide(!hide)} />}
				iconPosition='left'
				validate={(data) => validateForm('password', data)}
			/>
			<MessageLogin value={errors.password} />
			<Link className='reset-password-link' to='/verify-email'>
				{locale.forgotPassword}
			</Link>
			<Button
				fluid
				type='submit'
				className='btn-confirm'
				disabled={!user.email || !user.password}
			>
				{form.button}
			</Button>
		</Form>
	);
}

SignIn.propTypes = {
	onLogin: PropTypes.any,
	hiddenErrorResponse: PropTypes.any,
};
