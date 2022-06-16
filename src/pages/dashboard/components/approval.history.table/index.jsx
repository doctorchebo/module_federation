/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import ApprovalHistoryRow from 'pages/dashboard/components/approval.history.row';
import CustomTableHeader from 'components/customTableHeader';

/**
 * @param {object} props - component properties
 * @returns {React.Component} - component for displaying a table
 */
function ApprovalHistoryTable(props) {
	const { data } = props;
	const headers = ['Activity', 'Entered', 'In Progress', 'Failed', 'Approved', ''];

	return (
		<Table name='Approval-History-Table' className='table-container'>
			<CustomTableHeader className='approval-history-table' headers={headers} />
			<Table.Body className='approval-history-table-body'>
				{data?.map((item, index) => (
					<ApprovalHistoryRow key={index} item={item}></ApprovalHistoryRow>
				))}
			</Table.Body>
		</Table>
	);
}

ApprovalHistoryTable.propTypes = {
	data: PropTypes.array,
};

export default ApprovalHistoryTable;
