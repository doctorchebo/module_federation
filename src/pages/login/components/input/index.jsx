import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * @param {*} props -
 * @returns {React.Component} -
 */
export function InputLogin(props) {
	const { validate } = props;
	return (
		<Form.Input
			fluid
			iconPosition={props.iconPosition}
			type={props.type}
			label={props.label}
			placeholder={props.placeholder}
			onChange={(event) => {
				validate(event.target.value);
			}}
			icon={props.icon}
		/>
	);
}

InputLogin.propTypes = {
	type: PropTypes.string,
	validate: PropTypes.any,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	icon: PropTypes.element,
	iconPosition: PropTypes.string,
};
