import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'evaluations';

const apiEvaluations = new ApiCore({
	getAllWithParams: true,
	getSingle: true,
	post: true,
	put: true,
	url: url,
	service: enumServices.MainService,
});

export default apiEvaluations;
