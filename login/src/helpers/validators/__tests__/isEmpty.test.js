import { isEmpty } from '..';

describe('isEmpty function', () => {
	describe.each([
		['', true],
		[0, true],
		[false, true],
		[[], true],
		[{}, true],
		[null, true],
		[undefined, true],
		[new Error(), false],
	])('with param as: "%i"', (value, expected) => {
		test(`returns ${expected}`, () => {
			expect(isEmpty(value)).toBe(expected);
		});
	});
});
