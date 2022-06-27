import ClientError from './ClientError';

export default class Unauthorized extends ClientError {
	constructor(message: string) {
		super(message);
	}
}
