import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from 'api/utilities/core';

const url = 'permissions';

const apiPermissions = new ApiCore({
	getAll: true,
	url: url,
	service: enumServices.IdentityService,
});

export default apiPermissions;
