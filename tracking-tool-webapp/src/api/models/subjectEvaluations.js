import { ApiCore } from 'api/utilities/core';
import { enumServices } from 'api/utilities/enumServices';

const url = 'subjectEvaluations';

const apiSubjectEvaluations = new ApiCore({
	getSingle: true,
	getAll: true,
	url: url,
	service: enumServices.MainService,
});

export default apiSubjectEvaluations;
