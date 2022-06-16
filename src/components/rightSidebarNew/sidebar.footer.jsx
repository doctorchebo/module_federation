import React from 'react';
import { Segment } from 'semantic-ui-react';
import SidebarButton from './sidebar.button';

/**
 * Render the Right sidebar footer (toolbar)
 *
 * @param {*} properties - properties
 * @returns {React.Component} - Footer component
 */
export default function Footer(properties) {
	const { cancel, save } = properties;

	return (
		<div className='footer'>
			<Segment basic textAlign='right'>
				<SidebarButton {...cancel} onClick={cancel.onClick} />
				<SidebarButton {...save} onClick={save.onClick} />
			</Segment>
		</div>
	);
}
