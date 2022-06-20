import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * @param {object} props - component properties
 * @returns {React.Component} - component for displaying a table
 */
function SubjectTable(props) {
	const { subjects } = props;
	return (
		<Table name='Subjects-Table' className='table-container'>
			<Table.Header>
				<Table.Row>
					<Table.HeaderCell>Program version</Table.HeaderCell>
					<Table.HeaderCell
						style={{
							textAlign: 'left',
						}}
					>
						Subject
					</Table.HeaderCell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{subjects?.map(({ programVersion, subject, id }) => (
					<Table.Row key={id}>
						<Table.Cell>{programVersion}</Table.Cell>
						<Table.Cell>{subject}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

SubjectTable.propTypes = {
	subjects: PropTypes.array,
};

export default SubjectTable;
