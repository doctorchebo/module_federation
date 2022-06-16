export class AbstractControl {
	constructor(validators = []) {
		this.validators = validators;
		this.errors = {};
		this.value = null;
		this.dirty = false;
	}

	getError(errorCode) {
		const error = this.errors[errorCode];
		if (error === undefined) {
			throw new Error('Error not found');
		}
		return error;
	}

	hasError(errorCode) {
		const hasError = this.getError(errorCode);
		return !!hasError;
	}

	setErrors(errors) {
		this.errors = errors;
	}

	hasErrors() {
		return Object.values(this.errors).some((error) => !!error);
	}

	updateErrors() {
		let errorsFound = {};
		for (const fn of this.validators) {
			const response = fn(this);
			response && (errorsFound = { ...errorsFound, ...response });
		}
		this.setErrors(errorsFound);
	}
}
