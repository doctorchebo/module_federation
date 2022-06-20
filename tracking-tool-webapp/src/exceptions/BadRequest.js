import ClientError from './ClientError';

export default class BadRequest extends ClientError {
	constructor(message) {
		super(message);
	}
}
