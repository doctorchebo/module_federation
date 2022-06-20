import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'events';

const apiEvents = new ApiCore({
	getAllWithParams: true,
	getSingle: true,
	put: true,
	post: true,
	url: url,
	service: enumServices.MainService,
});

export default apiEvents;
