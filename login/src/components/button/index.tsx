import React from 'react';
import { Button as SButton } from 'semantic-ui-react';
import './button.css';

export interface props {
	value: string;
	className?: string;
	disabled?: boolean;
}

const Button = ({ value, className, disabled }: props) => {
	const btnColor = className === 'login' ? 'blue' : 'green';
	const icon = className === 'login' ? 'sign in' : 'signup';
	return (
		<SButton
			fluid
			color={btnColor}
			content={value}
			circular
			icon={icon}
			size='medium'
			disabled={disabled}
		/>
	);
};

export default Button;
