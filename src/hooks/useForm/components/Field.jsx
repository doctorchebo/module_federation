import React, { ElementType } from 'react';
import { string, elementType, object, func } from 'prop-types';

/**
 * This is a component to works with Forms.
 *
 * @param {any} props Properties.
 * @returns {ElementType} Returns a Component.
 */
export function FieldComponent(props) {
	const {
		formControlName: name,
		children,
		as: Element,
		fieldControl,
		controls,
		getFormGroup,
		onChange,
		...fieldProps
	} = props;
	const elementProps = {
		...fieldProps,
		name,
		value: controls[name].value,
		onChange: (event) => {
			onChange instanceof Function && onChange(event);
			return fieldControl(event, getFormGroup);
		},
	};
	return props.as ? (
		<Element {...elementProps}>{children}</Element>
	) : (
		<input {...elementProps}>{children}</input>
	);
}

FieldComponent.propTypes = {
	as: elementType,
	formControlName: string.isRequired,
	type: string,
	children: elementType,
	fieldControl: func,
	getFormGroup: func,
	controls: object,
	onChange: func,
};
