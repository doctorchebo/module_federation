import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'event-types';

const apiEventType = new ApiCore({
	getAll: true,
	url: url,
	service: enumServices.MainService,
});

export default apiEventType;
