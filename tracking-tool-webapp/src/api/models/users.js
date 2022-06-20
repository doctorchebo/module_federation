import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'users';

const apiUsers = new ApiCore({
	getAll: true,
	getAllWithParams: true,
	getSingle: true,
	post: true,
	put: true,
	url: url,
	service: enumServices.IdentityService,
});

export default apiUsers;
