import { fileProvider } from '../fileProvider';
import xmlHttpRequestWithProgress from '../xmlHttpRequest';

jest.mock('../xmlHttpRequest.js');

describe('/api/utilities/fileProvider', () => {
	test('Should execute upload files function', () => {
		fileProvider.upload('resource', {}, {}, 'token', 'post');
		expect(xmlHttpRequestWithProgress).toBeCalledTimes(1);
	});
});
