import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'program-versions/status';
const programsInProgressAPI = new ApiCore({
	getAll: true,
	getAllWithParams: true,
	url: url,
	service: enumServices.MainService,
});

export default programsInProgressAPI;
