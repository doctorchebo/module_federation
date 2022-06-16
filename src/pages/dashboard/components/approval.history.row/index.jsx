import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

/**
 * @param {object} props - Component properties
 * @returns {React.Component} - Custom table row
 */
function ApprovalHistoryRow(props) {
	const { item } = props;
	return (
		<>
			<Table.Row name='Custom-Row' className='approval-history-row'>
				<Table.Cell key='table-cell-1' name='activity' className='activity'>
					{item.activity}
				</Table.Cell>
				<Table.Cell key='table-cell-2' name='entered' width='3'>
					{item.entered}
				</Table.Cell>
				<Table.Cell key='table-cell-3' name='inProgress' width='3'>
					{item.inProgress}
				</Table.Cell>
				<Table.Cell key='table-cell-4' name='failed' width='3'>
					{item.failed}
				</Table.Cell>
				<Table.Cell key='table-cell-5' name='approved' width='2'>
					{item.approved}
				</Table.Cell>
			</Table.Row>
		</>
	);
}

ApprovalHistoryRow.propTypes = {
	item: PropTypes.object,
};
ApprovalHistoryRow.defaultProps = {
	item: null,
};

export default ApprovalHistoryRow;
