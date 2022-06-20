import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'program-versions/programs';

const apiPrograms = new ApiCore({
	getAllWithParams: true,
	url: url,
	service: enumServices.MainService,
});

export default apiPrograms;
