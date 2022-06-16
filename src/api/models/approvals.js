import { ApiCore } from '../utilities/core';
import { enumServices } from '../utilities/enumServices';

const url = 'approvals';

const apiApprovals = new ApiCore({
	post: true,
	put: true,
	url: url,
	service: enumServices.MainService,
});

export default apiApprovals;
