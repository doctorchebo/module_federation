import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './input.css';

interface IInputProps {
	className?: string;
	value?: string;
	label?: string;
	type?: string;
	placeholder: string;
}
export const InputLogin = (props: IInputProps) => {
	return (
		<Form.Input
			className='input-field'
			fluid
			value={props.value}
			type={props.type}
			label={props.label}
			placeholder={props.placeholder}
		/>
	);
};
