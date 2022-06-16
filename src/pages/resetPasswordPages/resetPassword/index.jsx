import React from 'react';
import BasePage from 'components/basePage';
import ResetPasswordForm from './components/resetPasswordForm';
import { useApplication } from 'application/context/AppContext';
import { useHistory } from 'react-router';
import locale from '../locale/en.json';

/**
 * @returns {object} - ResetPassword component
 */
export default function ResetPassword() {
	const [, actions] = useApplication();
	const history = useHistory();

	const model = {
		code: '',
		newPassword: '',
		confirmPassword: '',
	};

	const onSubmit = (model) => {
		actions.onChangeUserPassword(model);
		history.push('/login');
	};
	return (
		<div className='reset-password'>
			<BasePage
				goTo={'/'}
				title={locale.resetPasswordPage.title}
				icon='home'
				body={
					<ResetPasswordForm
						onSubmit={onSubmit}
						model={model}
						locale={locale.resetPasswordPage.resetPassword}
					/>
				}
			></BasePage>
		</div>
	);
}
