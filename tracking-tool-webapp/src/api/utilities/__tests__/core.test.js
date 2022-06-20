import { ApiCore } from '../core';

const mockData = [
	{
		id: 1,
		uuid: '494c7fbc-0fde-4230-a15c-d5bb903f8292',
		description: 'Description 1',
	},
	{
		id: 2,
		uuid: '494c7fbc-0fde-4230-a15c-d5bb903f8294',
		description: 'Description 2',
	},
];

const options = {
	getAll: true,
	getAllWithParams: true,
	getSingle: true,
	post: true,
	put: true,
	patch: true,
	delete: true,
	service: 'Auth',
	url: 'Members',
	plural: 'Members',
	single: 'Members',
};

const apiCore = new ApiCore(options);

describe('api/models/auth', () => {
	describe('Auth', () => {
		it('Should be an instance if Apicore', async () => {
			expect(apiCore).toBeInstanceOf(ApiCore);
		});
	});
	describe('Test apis', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('Should be an error status', async () => {
			global.fetch = jest.fn(() =>
				Promise.reject({
					status: 400,
				})
			);
			await expect(apiCore.getAll()).rejects.toThrow();
		});
		it('Should be all data with params status 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData),
				})
			);
			const apiCore = new ApiCore(options);
			expect(await apiCore.getAllWithParams({})).toEqual(mockData);
		});
		it('Should be all data with status 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData),
				})
			);
			const apiCore = new ApiCore(options);
			expect(await apiCore.getAll()).toEqual(mockData);
		});
		it('Should be error data with status 200', () => {
			global.fetch = jest.fn(() =>
				Promise.reject({
					status: 400,
				})
			);
			options.getAll = false;
			const apiCore = new ApiCore(options);
			expect(apiCore.getAll).toEqual(undefined);
		});
		it('Should be single data with status 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData[0]),
				})
			);
			const apiCore = new ApiCore(options);
			expect(await apiCore.getSingle()).toEqual(mockData[0]);
		});
		it('Should be post data with status 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData[1]),
				})
			);
			const apiCore = new ApiCore(options);
			const data = await apiCore.post();
			expect(data).toEqual(mockData[1]);
			expect(data.description).toEqual(mockData[1].description);
		});
		it('Should be error post data with status 400', () => {
			global.fetch = jest.fn(() =>
				Promise.reject({
					status: 400,
				})
			);
			options.post = false;
			const apiCore = new ApiCore(options);
			expect(apiCore.post).toEqual(undefined);
		});
		it('Should be patch data with status 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData[1]),
				})
			);
			const apiCore = new ApiCore(options);
			const data = await apiCore.patch();
			expect(data).toEqual(mockData[1]);
			expect(data.description).toEqual(mockData[1].description);
		});
		it('Should be put data with status 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData[1]),
				})
			);
			const apiCore = new ApiCore(options);
			const data = await apiCore.put();
			expect(data).toEqual(mockData[1]);
			expect(data.description).toEqual(mockData[1].description);
		});
	});
});
