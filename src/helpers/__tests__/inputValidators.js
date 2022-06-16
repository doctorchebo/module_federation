import { validatePhoneNumber } from 'helpers/inputValidators';

describe('helpers/inputValidators', () => {
	describe('validatePhoneNumber', () => {
		test('should return true value with a phone number valid of 7 digits', () => {
			expect(validatePhoneNumber(4777777)).toBeTruthy();
		});
		test('should return true value with a phone number valid of 8 digits', () => {
			expect(validatePhoneNumber(77777777)).toBeTruthy();
		});
		test('should return false value with a phone number of 6 digits', () => {
			expect(validatePhoneNumber(787878)).toBeFalsy();
		});
		test('should return false value with a phone number of 9 digits', () => {
			expect(validatePhoneNumber(787878787)).toBeFalsy();
		});
	});
});
