import { AbstractControl } from './AbstractControl';

export class FormGroup extends AbstractControl {
	constructor(formControls = {}, abstractControlOptions = {}) {
		const { validators } = abstractControlOptions;
		super(validators);
		this.controls = formControls;
		this.abstractControlOptions = abstractControlOptions;
		this.updateControl();
	}

	updateControl() {
		const formValues = {};
		for (const [key, control] of Object.entries(this.controls)) {
			formValues[key] = control.updateControl().value;
		}
		this.value = formValues;
		this.updateErrors();
		return this;
	}

	get isValid() {
		return (
			!this.hasErrors() && Object.values(this.controls).every((control) => control.isValid)
		);
	}

	getControl(name) {
		const result = this.controls[name];
		if (result) {
			return result;
		}
		throw new Error(`'${name}' control don't found`);
	}
}
