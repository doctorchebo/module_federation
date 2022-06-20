import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'candidates';

const apiCandidate = new ApiCore({
	getAllWithParams: true,
	getAll: true,
	getSingle: false,
	post: true,
	put: true,
	url: url,
	service: enumServices.Candidates,
});

export default apiCandidate;
