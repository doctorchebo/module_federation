import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'program-versions';

const programVersionsAPI = new ApiCore({
	getAllWithParams: true,
	getSingle: true,
	post: true,
	put: true,
	url: url,
	service: enumServices.MainService,
});

export default programVersionsAPI;
