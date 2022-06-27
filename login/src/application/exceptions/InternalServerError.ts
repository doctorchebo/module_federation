import ClientError from './ClientError';
export default class InternalServerError extends ClientError {
	constructor(message: string) {
		super(message);
	}
}
