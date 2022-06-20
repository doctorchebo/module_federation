/* eslint-disable max-len*/
import ValidateProgramVersionFile, {
	ValidateKeys,
	validateEmailFormat,
	ValidateJsonSubStructure,
	ValidateJsonSubSubStructure,
	readFile,
} from '../programVersionFileValidators';
import { subject, stage, programVersion } from '../programVersionFileParams';

const response = { isValid: true, messages: [] };
const objectToCompareNotIncludedKeys = {
	version: '',
	program: '',
	startDate: '',
	endDate: '',
	coordinator: '',
	stages: '',
	incorrectKey: '',
};
const objectToCompareMissingKeys = {
	version: '',
	program: '',
	startDate: '',
	endDate: '',
	coordinator: '',
};

describe('src/helpers/programVersionFileValidators', () => {
	describe('Validate email format', () => {
		test('ValidateEmailFormat should return null when email is without @', () => {
			const email = 'myemailexample.com';
			const expected = validateEmailFormat(email);
			expect(expected).toBeNull();
		});

		test('ValidateEmailFormat should return null when email is without . before @', () => {
			const email = 'myemail@examplecom';
			const expected = validateEmailFormat(email);
			expect(expected).toBeNull();
		});

		test('ValidateEmailFormat should return null when email ends with .', () => {
			const email = 'myemail@example.';
			const expected = validateEmailFormat(email);
			expect(expected).toBeNull();
		});

		test('ValidateEmailFormat should return null when email ends with @', () => {
			const email = 'myemail@';
			const expected = validateEmailFormat(email);
			expect(expected).toBeNull();
		});

		test('ValidateEmailFormat should return an array when email is valid', () => {
			const email = 'myemail@example.com';
			const expected = validateEmailFormat(email);
			expect(Array.isArray(expected)).toBe(true);
		});
	});

	describe('Validate Object keys', () => {
		test('ValidateKeys should return an object with the true state when the object to compare has the correct keys.', () => {
			const expected = ValidateKeys(programVersion, programVersion);
			const data = {
				notIncluded: [],
				missing: [],
				status: true,
			};
			expect(expected).toEqual(data);
		});
		test('ValidateKeys should return an object with status false containing the keys not included.', () => {
			const actual = ValidateKeys(programVersion, objectToCompareNotIncludedKeys);
			const expected = {
				notIncluded: ['incorrectKey'],
				missing: [],
				status: false,
			};
			expect(actual).toEqual(expected);
		});
		test('ValidateKeys should return an object with status false containing the missing keys.', () => {
			const actual = ValidateKeys(programVersion, objectToCompareMissingKeys);
			const expected = {
				missing: ['stages'],
				notIncluded: [],
				status: false,
			};
			expect(actual).toEqual(expected);
		});
	});

	describe('Validate Json Structure', () => {
		test('Validate Json SubSubStructure.', () => {
			const subjects = [
				{ subjectNumber: '1', name: 'frontend', trainer: 'osmar' },
				{ subjectNumber: '2', name: 'backend' },
			];
			const actual = ValidateJsonSubSubStructure(subjects, subject, response);
			const expected = {
				isValid: false,
				messages: ['Invalid structure: \n\t\t\ttrainer, \n\t\t\t'],
			};
			expect(actual).toEqual(expected);
		});
		test('Validate Json SubStructure.', () => {
			const stages = [
				{
					stageNumber: '1',
					name: 'Diagnosis',
					startDate: '2021-04-05T07:27:04.947Z',
					approvalRequired: false,
				},
				{
					stageNumber: '2',
					name: 'Diagnosis',
					subjects: [{ number: '1', name: 'frontend', trainer: 'osmar' }],
				},
			];
			const actual = ValidateJsonSubStructure(stages, stage, response);
			const expected = {
				isValid: false,
				messages: [
					'Invalid structure: \n\t\t\ttrainer, \n\t\t\t',
					'Invalid structure: \n\t\t\tendDate,subjects, \n\t\t\t',
					'Invalid structure: \n\t\t\tstartDate,endDate,approvalRequired, \n\t\t\t',
				],
			};
			expect(actual).toEqual(expected);
		});

		test('should read a valid json', async () => {
			const data = {
				name: 'Test',
				stageNumber: '2',
				subjects: [{ number: '1', name: 'frontend', trainer: 'jhon' }],
			};

			const file = new File([JSON.stringify(data)], 'test.json');
			const result = await readFile(file);
			expect(result).toStrictEqual(data);
		});
	});

	describe('ValidateProgramVersionFile function', () => {
		test('should return invalid structure', async () => {
			const data = {
				name: 'Test',
			};

			const file = new File([JSON.stringify(data)], 'test.json');
			const result = await ValidateProgramVersionFile(file);
			expect(result.isValid).toBeFalsy();
			expect(result.messages[0].includes('Invalid structure:')).toBeTruthy();
		});

		test('should return valid structure', async () => {
			const data = {
				version: '',
				program: '',
				startDate: '',
				endDate: '',
				coordinator: '',
				stages: '',
			};
			const file = new File([JSON.stringify(data)], 'test.json');
			const result = await ValidateProgramVersionFile(file);
			const expected = {
				isValid: true,
				messages: [],
			};

			expect(result).toEqual(expected);
		});

		test('should return invalid file csv', async () => {
			const data = {};

			const file = new File([JSON.stringify(data)], 'test.csv');
			const result = await ValidateProgramVersionFile(file);

			const expected = {
				isValid: false,
				messages: ['csv Is not a valid file extension type'],
			};

			expect(result).toEqual(expected);
		});
	});
});
