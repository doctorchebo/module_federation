const { enumServices } = require('api/utilities/enumServices');
const { default: ApiSettings } = require('settings/settings');

describe('src/settings/settings', () => {
	test('Should get the production host.', () => {
		let actual = ApiSettings('production');
		expect(actual[enumServices.AuthService].URL).toEqual('http://backend');
	});

	test('Should get the development host.', () => {
		let actual = ApiSettings('development');
		expect(actual[enumServices.AuthService].URL).toEqual('http://localhost');
	});

	test('Should get the uat host.', () => {
		let actual = ApiSettings('uat');
		expect(actual[enumServices.MainService].URL).toEqual('http://200.106.245.182');
	});
});
