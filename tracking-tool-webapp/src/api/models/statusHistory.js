import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'status';

const apiStatusHistory = new ApiCore({
	getAllWithParams: false,
	getAll: false,
	getSingle: true,
	put: true,
	post: false,
	url: url,
	service: enumServices.MainService,
});

export default apiStatusHistory;
