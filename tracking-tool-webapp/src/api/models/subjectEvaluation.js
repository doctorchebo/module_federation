import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'subjectEvaluation';

const apiSubjectEvaluation = new ApiCore({
	deleteSingle: true,
	getAllWithParams: true,
	getSingle: true,
	getAll: true,
	post: true,
	put: true,
	url: url,
	service: enumServices.MainService,
});

export default apiSubjectEvaluation;
