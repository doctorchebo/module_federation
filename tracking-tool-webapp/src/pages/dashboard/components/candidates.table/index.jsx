import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
/* eslint-disable max-len */
import mapCandidatesToTable from 'pages/dashboard/sections/candidates/helpers/mapCandidatesToTable';
import CandidateTableRow from 'pages/dashboard/components/candidates.custom.row';
import CustomTableHeader from 'components/customTableHeader';

/**
 * @param {object} props - component properties
 * @returns {React.Component} - component for displaying a table
 */
function CandidatesTable(props) {
	const { value, actions } = props;
	const { headers } = mapCandidatesToTable(value);
	return (
		<Table name='Candidates-Table' className='table-container'>
			<CustomTableHeader className='candidates-table' headers={headers} />
			<Table.Body className='candidates-table-body'>
				{value.map((item, index) => (
					<CandidateTableRow
						key={index}
						item={item}
						actions={actions}
					></CandidateTableRow>
				))}
			</Table.Body>
		</Table>
	);
}

CandidatesTable.propTypes = {
	value: PropTypes.array,
	actions: PropTypes.object,
};

export default CandidatesTable;
