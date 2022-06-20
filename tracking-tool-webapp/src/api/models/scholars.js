import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'scholars';

const apiScholar = new ApiCore({
	getAllWithParams: true,
	getSingle: true,
	getAll: true,
	post: true,
	put: true,
	url: url,
	service: enumServices.MainService,
});

export default apiScholar;
