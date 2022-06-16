import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'applicants-types';

const apiApplicantsTypes = new ApiCore({
	getAll: true,
	url: url,
	service: enumServices.MainService,
});

export default apiApplicantsTypes;
