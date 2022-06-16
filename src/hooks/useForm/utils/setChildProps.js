import { cloneElement, DetailedReactHTMLElement } from 'react';
import { AbstractControl } from '../models';
import { FieldComponent } from '../components/Field';

/**
 * This function update almost all children props from a Form.
 *
 * @param {DetailedReactHTMLElement} child This is a child or children.
 * @param {Function} fieldControl This function update an field.
 * @param {{key:AbstractControl}} controls These ones contains group of AbstractControl.
 * @param {Function} getFormGroup This function determines the FormGroup to use.
 * @returns {DetailedReactHTMLElement} Returns a child or children modified.
 */
export function setChildProps(child, fieldControl, controls, getFormGroup) {
	if (!(child instanceof Object)) {
		return child;
	}
	if (child.type === FieldComponent) {
		return cloneElement(child, { fieldControl, controls, getFormGroup });
	}

	const { formGroupName: name, children } = child.props;
	let getSubFormGroup = getFormGroup;
	if (name) {
		getSubFormGroup = (form) => getFormGroup(form).getControl(name);
		controls = controls[name].controls;
	}
	let newChildren = children;
	if (children instanceof Array) {
		newChildren = children.map((child) => {
			return setChildProps(child, fieldControl, controls, getSubFormGroup);
		});
	} else if (children instanceof Object) {
		newChildren = setChildProps(children, fieldControl, controls, getSubFormGroup);
	}
	return cloneElement(child, {
		children: newChildren,
	});
}
