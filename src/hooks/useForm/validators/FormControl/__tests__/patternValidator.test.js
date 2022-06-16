import { patternValidator } from '../patternValidator';

describe('PatternValidatorTest', () => {
	describe('without error params', () => {
		test('given a pattern of RegExp type', () => {
			expect(patternValidator(/ab+c/)).toBeInstanceOf(Function);
		});
		test('given a pattern of string type', () => {
			expect(patternValidator('100')).toBeInstanceOf(Function);
		});
		test('given a pattern of string type and error of Error type', () => {
			expect(patternValidator(null, new Error())).toBeInstanceOf(Function);
		});
		test('given a pattern of null type', () => {
			expect(patternValidator(null)).toBeInstanceOf(Function);
		});
		test('given a pattern of undefinied type', () => {
			expect(patternValidator(undefined)).toBeInstanceOf(Function);
		});
		test('given a pattern of number type and error of Error type', () => {
			expect(patternValidator(0, new Error())).toBeInstanceOf(Function);
		});
	});
	describe('with error params', () => {
		test('given a pattern valid but an error as null', () => {
			expect(() => {
				patternValidator(/ab+c/, null);
			}).toThrowError('Invalid params');
		});
		test('given a pattern valid but an error as false', () => {
			expect(() => {
				patternValidator(/ab+c/, false);
			}).toThrowError('Invalid params');
		});
		test('given a pattern valid but an error as 0', () => {
			expect(() => {
				patternValidator(/ab+c/, 0);
			}).toThrowError('Invalid params');
		});
	});
});
