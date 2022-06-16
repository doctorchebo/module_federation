import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'users/roles';

const userRolesApi = new ApiCore({
	getAll: true,
	getSingle: true,
	url: url,
	service: enumServices.MainService,
});

export default userRolesApi;
