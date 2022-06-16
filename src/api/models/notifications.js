import { enumServices } from 'api/utilities/enumServices';
import { ApiCore } from 'api/utilities/core';

const url = 'notifications';

const notificationsAPI = new ApiCore({
	getAll: true,
	post: true,
	url: url,
	service: enumServices.Notifications,
});

export default notificationsAPI;
