import React from 'react';
import { Menu, Sidebar } from 'semantic-ui-react';
import Header from './sidebar.header';
import Footer from './sidebar.footer';
import Noop from 'helpers/Noop';

/**
 * Render a Generic right sidebar component
 *
 * @param {object} properties - properties
 * @returns {React.Component}- Sidebar component
 */
export default function RightSidebar(properties) {
	const { header, content, footer, onHide, visible } = properties;
	return (
		<Sidebar
			as={Menu}
			animation='overlay'
			icon='labeled'
			onHide={onHide}
			vertical
			direction='right'
			width='very wide'
			visible={visible}
		>
			{header && <Header back={header.back} />}
			{content}
			{footer && <Footer cancel={footer.cancel} save={footer.save} />}
		</Sidebar>
	);
}

RightSidebar.defaultProps = {
	header: {
		back: {
			basic: false,
			color: null,
			content: 'Back',
			icon: { name: 'left arrow', position: 'left' },
			size: 'tiny',
			onClick: Noop,
		},
	},
	content: null,
	footer: {
		cancel: {
			basic: true,
			color: 'blue',
			content: 'Cancel',
			icon: null,
			size: 'medium',
			onClick: Noop,
		},
		save: {
			basic: false,
			color: 'blue',
			content: 'Save',
			icon: null,
			size: 'medium',
			onClick: Noop,
		},
	},
};
