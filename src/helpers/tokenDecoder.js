import jwt_decode from 'jwt-decode';
import LoggerService from 'services/LoggerService';
/**
 * @returns {object} - decoded token.
 */
export function decodeToken() {
	const token = localStorage.getItem('token');
	try {
		return jwt_decode(token);
	} catch (error) {
		LoggerService.error(error);
	}
}
