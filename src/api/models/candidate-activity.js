import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'candidates/activity';

const candidateActivitiesAPI = new ApiCore({
	getAllWithParams: true,
	getSingle: false,
	post: false,
	put: true,
	url: url,
	service: enumServices.Candidates,
});

export default candidateActivitiesAPI;
