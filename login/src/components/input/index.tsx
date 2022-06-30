import React from 'react';
import { Input as SInput } from 'semantic-ui-react';

interface IInputProps {
	className?: string;
	value?: string;
	label?: string;
	type?: string;
	placeholder: string;
	autoComplete?: string;
}

export const InputLogin = (props: IInputProps) => {
	const icon = props.placeholder === 'username' ? 'user outline' : 'lock';
	return (
		<SInput
			fluid
			value={props.value}
			type={props.type || 'text'}
			label={{ icon, color: 'teal' }}
			placeholder={props.placeholder}
			name={props.placeholder}
			autoComplete={props.autoComplete}
			required
		/>
	);
};
