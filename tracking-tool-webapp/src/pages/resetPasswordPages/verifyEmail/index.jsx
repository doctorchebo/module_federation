import React from 'react';
import BasePage from 'components/basePage';
import VerifyEmailForm from './components/verifyEmailForm';
import { useApplication } from 'application/context/AppContext';
import { useHistory } from 'react-router';
import locale from '../locale/en.json';

/**
 * @returns {object} - Verifiy component
 */
export default function VerifyEmail() {
	const [, actions] = useApplication();
	const history = useHistory();

	const model = {
		email: '',
	};

	const onSubmit = (model) => {
		actions.onVerifyEmail(model);
		history.push('/reset-password');
	};

	return (
		<div className='reset-password'>
			<BasePage
				goTo={'/'}
				title={locale.verifyEmailPage.title}
				icon='home'
				body={
					<VerifyEmailForm
						onSubmit={onSubmit}
						model={model}
						locale={locale.verifyEmailPage.verifyEmail}
					/>
				}
			></BasePage>
		</div>
	);
}
