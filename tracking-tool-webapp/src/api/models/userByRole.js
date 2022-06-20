import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'users/role';

const apiUserByRole = new ApiCore({
	getAllWithParams: true,
	url: url,
	service: enumServices.MainService,
});

export default apiUserByRole;
