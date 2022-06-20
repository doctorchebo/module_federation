import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'program-versions';

const programVersionsMockAPI = new ApiCore({
	getAllWithParams: false,
	getSingle: true,
	post: false,
	put: false,
	url: url,
	service: enumServices.MainService,
});

export default programVersionsMockAPI;
