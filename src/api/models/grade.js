import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'grades';

const apiGrade = new ApiCore({
	getSingle: true,
	getAll: true,
	put: true,
	url: url,
	service: enumServices.MainService,
});

export default apiGrade;
