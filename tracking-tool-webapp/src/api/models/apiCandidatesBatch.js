import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'batch/candidates';

const apiCandidatesBatch = new ApiCore({
	getAllWithParams: false,
	getSingle: false,
	getAll: false,
	post: true,
	url: url,
	service: enumServices.Candidates,
});

export default apiCandidatesBatch;
