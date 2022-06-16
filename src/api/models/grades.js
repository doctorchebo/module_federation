import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'grades';

const apiGrades = new ApiCore({
	getAllWithParams: true,
	getSingle: false,
	getAll: true,
	put: false,
	post: false,
	url: url,
	service: enumServices.MainService,
});

export default apiGrades;
