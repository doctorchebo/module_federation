import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'evaluations/score/scholar';

const apiScholarStageScore = new ApiCore({
	getSingle: true,
	url: url,
	service: enumServices.MainService,
});

export default apiScholarStageScore;
