import locale from './../application/locale/en.json';
import { UsersActionTypes } from './../pages/dashboard/sections/users/context/enums';
import userIdentityAPI from './../api/models/userIdentity';

/**
 * @param {string} type - search type
 * @returns {object} - return the action type and the service
 */
function Factory(type) {
	const { user } = locale;
	switch (type) {
		case user:
			return { type: UsersActionTypes, service: userIdentityAPI };
		default:
			return {};
	}
}

export default Factory;
