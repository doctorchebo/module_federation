import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'events/summaryTab';

const apiEventsSummary = new ApiCore({
	getAllWithParams: true,
	getSingle: true,
	post: true,
	url: url,
	service: enumServices.MainService,
});

export default apiEventsSummary;
