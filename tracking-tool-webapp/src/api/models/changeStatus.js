import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from '../utilities/core';

const apiChangeStatus = new ApiCore({
	put: true,
	post: true,
	url: 'status',
	service: enumServices.MainService,
});

export default apiChangeStatus;
