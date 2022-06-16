import React, { useState } from 'react';
import { Table, Icon, Dropdown } from 'semantic-ui-react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import RolesDetails from 'pages/dashboard/components/roles.details';
/**
 * @param {*} props -
 * @returns {React.Component} -
 */
export default function RolesRow(props) {
	const { rol, numberOfColumns, onRoleDelete } = props;
	const [isExpanded, setIsExpanded] = useState(false);
	const history = useHistory();

	const handleRoleEdit = (role) => {
		history.push({
			pathname: `/dashboard/roles/${role.id}/edit`,
			state: { role: role },
		});
	};
	return (
		<>
			<Table.Row>
				<Table.Cell>
					<Icon
						onClick={() => setIsExpanded(!isExpanded)}
						name={!isExpanded ? 'angle right' : 'angle down'}
					/>
				</Table.Cell>
				<Table.Cell>
					<NavLink to={`/dashboard/roles/${rol.id}/edit`}>{rol.name}</NavLink>
				</Table.Cell>
				<Table.Cell>{rol.description}</Table.Cell>
				<Table.Cell>
					<Dropdown icon='ellipsis vertical'>
						<Dropdown.Menu>
							<Dropdown.Item
								icon='edit'
								content='Edit'
								onClick={() => handleRoleEdit(rol)}
							/>
							<Dropdown.Item
								icon='delete'
								content='Delete'
								onClick={() => onRoleDelete(rol.id, rol.name)}
							/>
						</Dropdown.Menu>
					</Dropdown>
				</Table.Cell>
			</Table.Row>
			{isExpanded ? (
				<Table.Row>
					<Table.Cell colSpan={numberOfColumns}>
						<RolesDetails value={rol} />
					</Table.Cell>
				</Table.Row>
			) : null}
		</>
	);
}

RolesRow.propTypes = {
	rol: PropTypes.object,
	numberOfColumns: PropTypes.number,
	onRoleDelete: PropTypes.func,
};
