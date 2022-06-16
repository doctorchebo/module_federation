const { isErrorsSignIn, isErrors, validateEmail } = require('./../validators');

describe('helpers/validators', () => {
	test('should check input size', () => {
		expect(isErrorsSignIn({ username: 'andres' })).toStrictEqual(6);
	});

	test('should check input size 2', () => {
		const errors = {
			name: 'Juan',
			lastname: 'Perez',
			username: 'Juan123',
			email: 'juanito@gmail.com',
		};
		expect(isErrors(errors)).toStrictEqual(4);
	});
	test('should check is incorrect input mail', () => {
		const email = 'bad email format';

		const result = validateEmail(email);

		expect(result).toBe('Email format incorrect');
	});
});
