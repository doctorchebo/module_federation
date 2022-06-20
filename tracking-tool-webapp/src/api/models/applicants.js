import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'scholars';

const apiApplicants = new ApiCore({
	getAllWithParams: true,
	getSingle: true,
	getAll: true,
	post: true,
	url: url,
	service: enumServices.MainService,
});

export default apiApplicants;
