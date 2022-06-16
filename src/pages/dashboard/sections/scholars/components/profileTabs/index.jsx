import React from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import locale from 'pages/dashboard/locale/en.json';
import './style.css';

/**
 * @param {object} props This object contain actions to execute
 * @param {object} props.items This object contains the data of tabs
 * @returns {React.Component} - Details
 */
export default function ProfileTabs({ items }) {
	const panes = locale.scholars.tabMenu.menuItems.map((item, index) => ({
		menuItem: item,
		render: () => (
			<Tab.Pane attached={false} key={index}>
				{items[index]}
			</Tab.Pane>
		),
	}));

	return (
		<div className='scholar-tab'>
			<Tab
				menu={{ secondary: true, pointing: true }}
				panes={panes}
				defaultActiveIndex='0'
				className='main-tab'
			/>
		</div>
	);
}

ProfileTabs.propTypes = {
	items: PropTypes.object,
};
