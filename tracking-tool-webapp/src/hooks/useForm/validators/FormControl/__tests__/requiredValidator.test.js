import { requiredValidator } from '../requiredValidator';

describe('requiredValidator function', () => {
	describe.each([[''], [0], [false], [[]], [{}], [null]])(
		'with param as: "%i", should throw',
		(value) => {
			test('an error', () => {
				expect(() => {
					requiredValidator(value);
				}).toThrowError('Invalid params');
			});
		}
	);
	describe.each([
		['an error'],
		[10],
		[true],
		[['first']],
		[{ message: 'an error' }],
		[undefined],
		[new Error()],
	])('with param as: "%i", should returns', (value) => {
		test('a Function', () => {
			expect(requiredValidator(value)).toBeInstanceOf(Function);
		});
	});
});
