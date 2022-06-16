import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'program-versions/allStatus';

const apiProgramVersionsStatus = new ApiCore({
	getAllWithParams: true,
	url: url,
	service: enumServices.MainService,
});

export default apiProgramVersionsStatus;
