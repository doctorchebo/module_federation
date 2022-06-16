import React from 'react';
import './styles.css';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import ConfirmModal from 'components/confirmModal';
import RolesRow from '../roles.row';
import locale from '../../locale/en.json';
import Noop from 'helpers/Noop';

/**
 * @param {*} props - properties
 * @returns {React.Component} - RolesTable component
 */
export default function RolesTable(props) {
	const { modal, roles, onDelete } = props;

	return (
		<>
			<Table className='table-roles table-container'>
				<Table.Header>
					<Table.Row>
						{locale.roles.tableHeaders.map((header, index) => (
							<Table.HeaderCell key={index} content={header} />
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{roles &&
						roles.map((rol) => {
							return (
								<RolesRow
									key={rol.id}
									rol={rol}
									numberOfColumns={locale.roles.tableHeaders.length}
									onRoleDelete={modal.onShow}
								/>
							);
						})}
				</Table.Body>
			</Table>
			<ConfirmModal
				header={modal.header}
				content={modal.message}
				action={onDelete}
				isOpen={modal.isOpen}
				setIsOpen={modal.setIsOpen}
			/>
		</>
	);
}

RolesTable.propTypes = {
	modal: PropTypes.object,
	roles: PropTypes.array,
	onDelete: PropTypes.func,
};

RolesTable.defaultProps = {
	modal: {},
	roles: [],
	onDelete: Noop,
};
