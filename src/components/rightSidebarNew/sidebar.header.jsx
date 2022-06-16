import React from 'react';
import { Segment } from 'semantic-ui-react';
import SidebarButton from './sidebar.button';

/**
 * Render the Right sidebar header (toolbar)
 *
 * @param {*} properties - properties
 * @returns {React.Component} - Header component
 */
export default function Header(properties) {
	const { back } = properties;

	return (
		<div className='header'>
			<Segment basic>
				<SidebarButton {...back} onClick={back.onClick} />
			</Segment>
		</div>
	);
}
