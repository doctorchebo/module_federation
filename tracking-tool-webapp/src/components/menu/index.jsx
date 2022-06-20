import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './style.css';
import locale from 'pages/dashboard/sections/scholars/locale/en.json';

const MenuDropdown = ({ placeholder, options, selectFilter, selectFilterValue }) => {
	const [filterName, setFilterName] = useState('');
	/**
	 * @param {object} event - event containing the filter value
	 * @param {string} name - name of the select filter
	 */
	function onChangeFilterName(event, name) {
		if (event.target.textContent === locale.any.name) {
			setFilterName(`${placeholder}: `);
		} else {
			setFilterName(name ? `${name}: ${event.target.textContent}` : event.target.textContent);
		}
	}
	return (
		<Dropdown placeholder={filterName ? filterName : placeholder}>
			<Dropdown.Menu>
				{options?.map((option, index) => (
					<Dropdown.Item key={index}>
						<Dropdown
							text={option.name}
							pointing='left'
							onChange={(e, { value }) => (
								selectFilterValue(value),
								selectFilter(option.key),
								onChangeFilterName(e, option.name)
							)}
							options={option.list}
						></Dropdown>
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};

MenuDropdown.propTypes = {
	options: PropTypes.any,
	selectFilter: PropTypes.any,
	selectFilterValue: PropTypes.any,
	placeholder: PropTypes.string,
};

export default MenuDropdown;
