import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'scholars/update-program-version';
const updateProgramVersionAPI = new ApiCore({
	patch: true,
	post: true,
	put: true,
	url: url,
	service: enumServices.MainService,
});

export default updateProgramVersionAPI;
