import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'activities';

const activitiesAPI = new ApiCore({
	getAllWithParams: true,
	getSingle: false,
	post: false,
	put: false,
	url: url,
	service: enumServices.Candidates,
});

export default activitiesAPI;
