import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'subjects';

const apiSubjectDetails = new ApiCore({
	getSingle: true,
	getAll: true,
	url: url,
	service: enumServices.MainService,
});

export default apiSubjectDetails;
