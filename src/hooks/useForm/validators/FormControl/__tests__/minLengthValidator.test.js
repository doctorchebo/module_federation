import { minLengthValidator } from '../minLengthValidator';

describe('MinLengthValidatorTest', () => {
	describe('without error params', () => {
		test('given a number more than 0', () => {
			expect(minLengthValidator(100)).toBeInstanceOf(Function);
		});
		test('given a number more than 0 as a string', () => {
			expect(minLengthValidator('100')).toBeInstanceOf(Function);
		});
		test('given a number more than 0 and error as a string', () => {
			expect(minLengthValidator('2', 'invalid size')).toBeInstanceOf(Function);
		});
		test('given a number more than 0 and error as an Error', () => {
			expect(minLengthValidator(2, new Error('invalid'))).toBeInstanceOf(Function);
		});
		test('given a number more than 0 and error as a Number', () => {
			expect(minLengthValidator(2, 2)).toBeInstanceOf(Function);
		});
		test('given a number valid but an error as undefined', () => {
			expect(minLengthValidator(1, undefined)).toBeInstanceOf(Function);
		});
	});
	describe('with error params', () => {
		test('given a number 0', () => {
			expect(() => {
				minLengthValidator(0);
			}).toThrowError('Invalid params');
		});
		test('given a number less than 0', () => {
			expect(() => {
				minLengthValidator(-1);
			}).toThrowError('Invalid params');
		});
		test('given a number valid but an error as null', () => {
			expect(() => {
				minLengthValidator(10, null);
			}).toThrowError('Invalid params');
		});
		test('given a number valid but an error as false', () => {
			expect(() => {
				minLengthValidator(2, false);
			}).toThrowError('Invalid params');
		});
		test('given a number valid but an error as 0', () => {
			expect(() => {
				minLengthValidator(1, 0);
			}).toThrowError('Invalid params');
		});
	});
});
