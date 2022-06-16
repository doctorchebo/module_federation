/* eslint-disable jest/valid-expect */
import { FileApiCore } from '../fileApiCore';
import { fileProvider } from '../fileProvider';

const URL = test;

const SERVICE = {
	URL: 'http://localhost',
	PORT: 1234,
	API_URL: 'http://localhost:1234/api/v1/',
};

describe('/api/utilities/fileApiCore', () => {
	describe('file api core structure', () => {
		test('should be a instance of FileApiCore', () => {
			const testApi = new FileApiCore({
				post: true,
				upload: true,
				url: URL,
				service: SERVICE,
			});
			expect(testApi).toBeInstanceOf(FileApiCore);
		});
	});
	describe('File api core actions', () => {
		test('Should execute upload method', () => {
			fileProvider.upload = jest.fn();
			const testApi = new FileApiCore({
				upload: true,
				url: URL,
				service: SERVICE,
			});
			testApi.upload(null, {}, 'token', 'complement');
			expect(fileProvider.upload).toBeCalledTimes(1);
		});
	});
});
