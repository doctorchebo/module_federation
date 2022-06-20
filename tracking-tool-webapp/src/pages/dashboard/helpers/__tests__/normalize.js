import { convertStagesToOptions } from '..';
import { normalizeScholarToUpdate } from '../normalize';

describe('pages/dashboard/helpers/normalize', () => {
	describe('ConvertStagesToOptions function', () => {
		test('Should return stages in options format', () => {
			const stages = [
				{ id: 'testId-01', name: 'Backend' },
				{ id: 'testId-02', name: 'Frontend' },
			];
			const expected = [
				{ key: 'testId-01', text: 'Backend', value: 'testId-01' },
				{ key: 'testId-02', text: 'Frontend', value: 'testId-02' },
			];
			const result = convertStagesToOptions(stages);
			expect(result).toStrictEqual(expected);
		});
	});

	describe('normalizeScholarToUpdate function', () => {
		test('Should return a formated object', () => {
			const scholar = {
				scholarId: 110,
				email: '',
				currentCity: '',
				phoneNumber: '',
				degree: '',
				career: '',
				university: '',
			};
			const expected = {
				id: 110,
				personalEmail: '',
				currentCity: '',
				phoneNumber: '',
				academicDegree: '',
				career: '',
				university: '',
			};
			const result = normalizeScholarToUpdate(scholar);
			expect(result).toStrictEqual(expected);
		});
	});
});
