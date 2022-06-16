import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'profile';

const apiProfile = new ApiCore({
	getAll: true,
	put: true,
	url: url,
	service: enumServices.AuthService,
});

export default apiProfile;
