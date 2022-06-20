import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'authentication';

const userAuthenticationAPI = new ApiCore({
	post: true,
	url: url,
	service: enumServices.IdentityService,
});

export default userAuthenticationAPI;
