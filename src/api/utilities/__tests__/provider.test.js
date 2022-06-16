import { apiProvider } from '../provider';
import ClientError from '../../../exceptions/ClientError';
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

describe('api/utilities/provider', () => {
	describe('Request Call', () => {
		it('Should get api data with code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData),
				})
			);
			const data = await apiProvider.getAll('/fake', 'Auth');
			expect(data[0].description).toEqual('Description 1');
		});
		it('Should get api data with complement url and code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData),
				})
			);
			const data = await apiProvider.getAll('/fake', 'Auth', {}, 'actives');
			expect(data[0].description).toEqual('Description 1');
		});
		it('Should get api data with complement url, token and code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData),
				})
			);
			const data = await apiProvider.getAll('/fake', 'Auth', 'children', 'token');
			expect(data[0].description).toEqual('Description 1');
		});
		it('Should getAllWithParams api data with params url and code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData),
				})
			);
			const data = await apiProvider.getAllWithParams('/fake', {}, 'Auth');
			expect(data[0].description).toEqual('Description 1');
		});
		it('Should getAllWithParams with params and complement url and code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData),
				})
			);
			const data = await apiProvider.getAllWithParams('/fake', {}, 'Auth', 'children');
			expect(data[0].description).toEqual('Description 1');
		});
		it('Should get api error with code 401', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 401,
				})
			);
			await expect(apiProvider.getAll('/fake', {})).rejects.toThrow(ClientError);
		});
		it('Should get single api data with code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData[0]),
				})
			);
			const data = await apiProvider.getSingle('/fake', 1, 'Auth');
			expect(data.description).toEqual('Description 1');
		});
		it('Should post api data with code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData[1]),
				})
			);
			const data = await apiProvider.post('/fake', {}, 'Auth');
			expect(data.description).toEqual('Description 2');
		});
		it('Should post api data with complement url and code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData[1]),
				})
			);
			const data = await apiProvider.post('/fake', {}, 'Auth', 'children');
			expect(data.description).toEqual('Description 2');
		});
		it('Should patch api data with code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData[1]),
				})
			);
			const data = await apiProvider.patch('/fake', {}, 'Auth');
			expect(data.description).toEqual('Description 2');
		});
		it('Should patch api data with complement url and code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData[1]),
				})
			);
			const data = await apiProvider.patch('/fake', {}, 'Auth', 'children');
			expect(data.description).toEqual('Description 2');
		});
		it('Should put api data with code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData[1]),
				})
			);
			const data = await apiProvider.put('/fake', {}, 'Auth');
			expect(data.description).toEqual('Description 2');
		});
		it('Should put api data with complement url and code 200', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					status: 200,
					json: () => Promise.resolve(mockData[1]),
				})
			);
			const data = await apiProvider.put('/fake', {}, 'Auth', 'children');
			expect(data.description).toEqual('Description 2');
		});
	});
});
