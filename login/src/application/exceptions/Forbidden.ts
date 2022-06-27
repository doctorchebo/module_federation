import ClientError from './ClientError';

export default class Forbidden extends ClientError {
	constructor(message: string) {
		super(message);
	}
}
