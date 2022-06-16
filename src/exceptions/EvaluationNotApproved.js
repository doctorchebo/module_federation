import ClientError from './ClientError';

export default class EvaluationNotApproved extends ClientError {
	constructor(message) {
		super(message);
	}
}
