import request from '../fetch';
import Unauthorized from '../../../exceptions/Unauthorized';
const service = 'Auth';
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

const mockError = {
	success: false,
	error: ['Email or password incorrect'],
};

describe('api/utilities/fetch', () => {
	describe('API Call', () => {
		afterEach(() => {
			if (global.fetch) {
				global.fetch.mockRestore();
			}
		});
		it('should request data successfully', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData),
				})
			);
			const data = await request('/fake', {}, service);
			expect(data[0].description).toEqual('Description 1');
			expect(fetch).toHaveBeenCalledTimes(1);
		});

		it('Should get api data error in promise', async () => {
			fetch.mockImplementationOnce(() => Promise.reject('API is down'));
			await expect(request('/fake')).rejects.toThrow();
		});

		it('Should get api data with parameters successfully', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData),
				})
			);
			const data = await request(
				'/fake',
				{
					queryParam1: 'query',
					queryParam2: 'query2',
				},
				service
			);
			expect(data[0].description).toEqual('Description 1');
			expect(fetch).toHaveBeenCalledTimes(1);
		});

		it('Should post api data with parameters successfully', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData),
				})
			);
			const data = await request(
				'/fake',
				{ username: 'rbaldiviezo', password: 'password' },
				service,
				'POST'
			);
			expect(data[0].description).toEqual('Description 1');
			expect(fetch).toHaveBeenCalledTimes(1);
		});

		it('Should put api data with parameters successfully', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData),
				})
			);
			const data = await request(
				'/fake',
				{ username: 'rbaldiviezo', password: 'password' },
				service,
				'PUT'
			);
			expect(data[0].description).toEqual('Description 1');
			expect(fetch).toHaveBeenCalledTimes(1);
		});

		it('Should get api data error with 401', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 401,
				})
			);
			await expect(request('/fake', {}, service)).rejects.toThrow(Unauthorized);
			expect(fetch).toHaveBeenCalledTimes(1);
		});

		it('Should get api data error with 403', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 403,
					json: () => Promise.resolve(mockError),
				})
			);
			await expect(request('/fake', {}, service)).rejects.toThrow();
			expect(fetch).toHaveBeenCalledTimes(1);
		});
		it('Should get api data error with 404', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 404,
					json: () => Promise.resolve(mockError),
				})
			);
			await expect(request('/fake', {}, service)).rejects.toThrow();
			expect(fetch).toHaveBeenCalledTimes(1);
		});
	});
});
