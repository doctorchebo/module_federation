import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'roles';

const apiRoles = new ApiCore({
	deleteSingle: true,
	getAllWithParams: true,
	getSingle: true,
	getAll: true,
	post: true,
	put: true,
	url: url,
	service: enumServices.IdentityService,
});

export default apiRoles;
