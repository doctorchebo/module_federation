import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'stages';

const apiStages = new ApiCore({
	getAllWithParams: true,
	getSingle: true,
	url: url,
	service: enumServices.MainService,
});

export default apiStages;
