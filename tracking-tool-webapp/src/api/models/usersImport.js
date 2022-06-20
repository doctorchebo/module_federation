import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'users/importFiles';

const apiUsersValidate = new ApiCore({
	post: true,
	url: url,
	service: enumServices.MainService,
});

export default apiUsersValidate;
