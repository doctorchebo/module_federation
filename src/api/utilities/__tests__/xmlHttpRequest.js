/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/valid-expect-in-promise */
import xmlHttpRequestWithProgress from '../xmlHttpRequest';

const service = 'Attachments';
const mockData = {
	id: '494c7fbc-0fde-4230-a15c-d5bb903f8292',
	name: 'attachment.js',
	eventId: '494c7fbc-0fde-4230-a15c-d5bb903f8292',
};

const information = {
	data: { files: null },
	onProgress: jest.fn(),
	multiple: false,
};
const xhrMock = {
	open: jest.fn(),
	setRequestHeader: jest.fn(),
	onreadystatechange: jest.fn(),
	send: jest.fn(),
	upload: {
		onprogress: jest.fn(),
	},
	readyState: 4,
	response: JSON.stringify(mockData),
	status: 200,
};

window.XMLHttpRequest = jest.fn(() => xhrMock);
describe('api/utilities/fetch', () => {
	describe('API good calls', () => {
		afterEach(() => {
			window.XMLHttpRequest = jest.fn(() => xhrMock);
		});
		it('Should request data successfully', () => {
			xmlHttpRequestWithProgress('/testUrl', service, information).then((data) => {
				expect(data.name).toEqual('attachment.js');
			});
		});
		it('Should execute onprogress function', () => {
			xmlHttpRequestWithProgress('/testUrl', service, information).then((data) => {
				expect(information.onProgress).toHaveBeenCalled();
			});
		});
	});
	describe('API bad calls', () => {
		afterEach(() => {
			const xhrMockWithErrors = {
				...xhrMock,
				status: 400,
				response: JSON.stringify({ errors: 'this is a error' }),
			};
			window.XMLHttpRequest = jest.fn(() => xhrMockWithErrors);
		});
		it('Should request errors when the request fails', async () => {
			xmlHttpRequestWithProgress('/testUrl', service, information).catch((e) => {
				expect(e.errors).toEqual('this is a error');
			});
		});
	});
});
