import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const url = 'status-type';

const apiStatusType = new ApiCore({
	getAll: true,
	url: url,
	service: enumServices.MainService,
});

export default apiStatusType;
