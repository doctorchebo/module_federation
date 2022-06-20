import { gradesToOptions } from '../normalize';

const userId = '9b39b96c-7b35-4260-af4a-e52c8e80671b';
jest.mock('helpers/tokenDecoder', () => ({
	decodeToken: () => ({ sub: `${userId}` }),
}));

describe('pages/dashboard/components/evaluationManager/helpers/normalize', () => {
	it('Should return grades to options', () => {
		const grades = [
			{
				key: '9b39b96c-7b35-4260-af4a-e52c8e80671a',
				text: 'A+',
				value: '9b39b96c-7b35-4260-af4a-e52c8e80671a',
			},
			{
				key: '9b39b96c-7b35-4260-af4a-e52c8e80672a',
				text: 'B+',
				value: '9b39b96c-7b35-4260-af4a-e52c8e80672a',
			},
		];
		const [grade1, grade2] = gradesToOptions(grades);
		expect(grade1.text).toStrictEqual('A+');
		expect(grade2.text).toStrictEqual('B+');
	});
});
