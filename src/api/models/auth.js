import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'auth/login';
const apiAuth = new ApiCore({
	getAll: true,
	post: true,
	url: url,
	service: enumServices.AuthService,
});

export default apiAuth;
