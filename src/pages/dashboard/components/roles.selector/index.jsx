import React from 'react';
import PropTypes from 'prop-types';
import { Table, Checkbox } from 'semantic-ui-react';
import locale from 'pages/dashboard/locale/en.json';
import Noop from 'helpers/Noop';

/**
 * Returns the table to select roles to edit permissions
 *
 * @param {object} props - properties
 * @returns {React.Component} - Table component
 */
export default function RolesSelector(props) {
	const { items, value: model, onSelect } = props;

	/**
	 * Removes a role unselected
	 *
	 * @param {string} id role id
	 */
	function removeRole(id) {
		const index = model.indexOf(id);
		index > -1 && model.splice(index, 1);
	}

	/**
	 * Handles roles selection
	 *
	 * @param {object} data props of checkbox
	 */
	function handleChange(data) {
		data.checked ? model.push(data.id) : removeRole(data.id);
		onSelect(model.length > 0);
	}

	return (
		<Table key='table'>
			<Table.Header key='table-header'>
				<Table.Row key='table-row-header'>
					<Table.HeaderCell />
					<Table.HeaderCell key='table-header'>
						{locale.roles.selector.title}
					</Table.HeaderCell>
				</Table.Row>
			</Table.Header>

			<Table.Body key={'table-body'}>
				{!!items.length &&
					items.map((role, index) => {
						return (
							<Table.Row key={index}>
								<Table.Cell key={'select-' + index} width={1}>
									<Checkbox
										id={role.id}
										onChange={(event, data) => handleChange(data)}
									/>
								</Table.Cell>
								<Table.Cell>{role.name}</Table.Cell>
							</Table.Row>
						);
					})}
			</Table.Body>
		</Table>
	);
}

RolesSelector.propTypes = {
	items: PropTypes.array.isRequired,
	value: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired,
};

RolesSelector.defaultProps = {
	items: [],
	value: [],
	onSelect: Noop,
};
