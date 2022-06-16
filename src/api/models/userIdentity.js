import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

/*TODO: currently this model was created to work with the identity service,
it must be refactored when migrating the complete service. */

const url = 'users';

const userIdentityAPI = new ApiCore({
	getAllWithParams: true,
	getAll: true,
	put: true,
	post: true,
	url: url,
	service: enumServices.IdentityService,
});

export default userIdentityAPI;
