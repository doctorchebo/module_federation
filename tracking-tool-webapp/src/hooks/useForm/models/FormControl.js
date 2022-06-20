import { AbstractControl } from './AbstractControl';

export class FormControl extends AbstractControl {
	constructor(value = null, ...validatorFns) {
		super(validatorFns);
		this.setValue(value);
		this.updateControl();
	}

	setValue(value) {
		this.value = value;
	}

	updateControl() {
		this.updateErrors();
		return this;
	}

	get isValid() {
		return !this.hasErrors();
	}
}
