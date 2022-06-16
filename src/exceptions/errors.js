import InternalServerError from './InternalServerError';
import BadRequest from './BadRequest';
import Forbidden from './Forbidden';
import Unauthorized from './Unauthorized';
import NotFound from './NotFound';

export const errors = {
	500: InternalServerError,
	400: BadRequest,
	401: Unauthorized,
	403: Forbidden,
	404: NotFound,
};
