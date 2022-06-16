import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const apiImageProfile = new ApiCore({
	getSingle: true,
	post: true,
	put: true,
	url: 'image',
	service: enumServices.MainService,
});

export default apiImageProfile;
