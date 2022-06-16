import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from 'api/utilities/core';

const url = 'scholars/skills-laststage-summary';

const apiScholarLastEvaluationSummary = new ApiCore({
	getAllWithParams: true,
	url: url,
	service: enumServices.MainService,
});

export default apiScholarLastEvaluationSummary;
