import { MESSAGE_ERROR } from 'helpers/constants';

export default class ClientError extends Error {
	constructor(message = MESSAGE_ERROR) {
		super(message);
		this.message = [message];
	}
}
