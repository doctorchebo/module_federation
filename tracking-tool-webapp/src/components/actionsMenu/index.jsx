import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, List } from 'semantic-ui-react';
import Noop from 'helpers/Noop';
import './styles.css';

/**
 * @param {object} props - properties with itemList and expanded attribute.
 * @returns {React.Component} - component to display a menu.
 */
function ActionsMenu(props) {
	const { itemList, expanded } = props;

	/**
	 * @param {Array} itemList - list with name and actions for the menu.
	 * @returns {Array} - array with options for dropdown component.
	 */
	function getDropDownOptions(itemList) {
		return itemList.map((item, index) => {
			return <Dropdown.Item description='>' className='action-menu' key={index} {...item} />;
		});
	}

	/**
	 * @param {Array} itemList - list with name and actions for the menu.
	 * @returns {Array} - array with list items for List component.
	 */
	function getListOptions(itemList) {
		return itemList.map((item, index) => {
			return <List.Item key={index} {...item} />;
		});
	}

	return (
		<>
			{!expanded ? (
				<Dropdown name='Actions-Menu' text=' ' icon='ellipsis vertical' direction='left'>
					<Dropdown.Menu>{getDropDownOptions(itemList)}</Dropdown.Menu>
				</Dropdown>
			) : (
				<List name='Actions-Menu'>{getListOptions(itemList)}</List>
			)}
		</>
	);
}

ActionsMenu.propTypes = {
	itemList: PropTypes.array,
	expanded: PropTypes.bool,
};
ActionsMenu.defaultProps = {
	itemList: [{ name: 'Menu Item', action: Noop }],
};

export default ActionsMenu;
