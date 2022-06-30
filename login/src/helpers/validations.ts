import { ICredentials, validationReponse } from '../pages/signIn/index';

export function validateFields(field: string, value: string): validationReponse {
	let error = '';
	const emailRegEx =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (field === 'username') {
		if (!value || value.length <= 1) {
			error = 'Please enter a username';
		} else if (value.length > 10) {
			error = !emailRegEx.test(value.toLowerCase()) ? 'Submit a valid Email' : '';
		}
	} else if (field === 'password') {
		if (!value || value.length <= 1) {
			error = 'Please enter a password';
		} else if (value.length <= 5) {
			error = 'Please enter a valid password, longer than 5 characters';
		}
	}

	return {
		type: field,
		msg: error,
	};
}
