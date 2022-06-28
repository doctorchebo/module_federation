export default function mode(mode: string | undefined) {
	switch (mode) {
		case 'prod':
			return 'http://40.117.121.137/identity-service/api/v1/';
		case 'uat':
			return 'http://200.106.245.182/identity-service/api/v1/';
		case 'dev':
			return 'http://localhost:8090/api/v1/';
		default:
			return 'http://localhost:8090/api/v1/';
	}
}
