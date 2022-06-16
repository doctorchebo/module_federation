import React, { Children, ElementType } from 'react';
import { array, elementType, func, object } from 'prop-types';
import { setChildProps } from '../utils';
import cloneDeep from 'clone-deep';

/**
 * This is a component to works with Forms.
 *
 * @param {any} props Properties.
 * @returns {ElementType} Returns a Component.
 */
export function FormComponent(props) {
	const { onSubmit, formGroupBuilder, as: Element, ...fieldProps } = props;
	const { fieldControl, handleSubmit, controls } = formGroupBuilder;
	const getFormGroup = (form) => form;
	const elementProps = {
		...fieldProps,
		onSubmit: handleSubmit(onSubmit),
	};

	let clonedProperties = cloneDeep(props);
	clonedProperties.children = formatChildren(props);

	/**
	 * @returns {Children} Returns children modified.
	 */
	function getChildren() {
		const resp = setChildProps(
			{ props: clonedProperties },
			fieldControl,
			controls,
			getFormGroup
		);
		return resp.props.children;
	}

	/**
	 * @param {any} props Properties.
	 * @returns {Array} Returns a children modify.
	 */
	function formatChildren(props) {
		let content = [];
		props.children.forEach((element) => {
			if (Array.isArray(element)) {
				element.forEach((item) => {
					content = [...content, item];
				});
			} else {
				content = [...content, element];
			}
		});
		return content;
	}

	return props.as ? (
		<Element {...elementProps}>{getChildren()}</Element>
	) : (
		<form {...elementProps}>{getChildren()}</form>
	);
}

FormComponent.propTypes = {
	as: elementType,
	onSubmit: func.isRequired,
	formGroupBuilder: object.isRequired,
	children: array,
};
