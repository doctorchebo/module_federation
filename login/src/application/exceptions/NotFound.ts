import ClientError from './ClientError';

export default class NotFound extends ClientError {
	constructor(message: string) {
		super(message);
	}
}
