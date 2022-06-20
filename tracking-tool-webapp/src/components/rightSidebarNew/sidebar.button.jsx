import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import Noop from 'helpers/Noop';

/**
 * Renders a custom Button to Sidebar component
 *
 * @param {object} properties - properties
 * @returns {React.Component}- Sidebar button component
 */
export default function SidebarButton(properties) {
	const { basic, color, content, icon, size, onClick } = properties;
	return (
		<Button
			basic={basic}
			color={color}
			icon
			labelPosition={icon ? icon.position : null}
			size={size}
			onClick={onClick}
		>
			{icon && <Icon name={icon.name} />}
			{content}
		</Button>
	);
}

SidebarButton.defaultProps = {
	basic: false,
	color: null,
	content: '',
	icon: null,
	size: 'medium',
	onClick: Noop,
};
