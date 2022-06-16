import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import SubjectEvaluationRow from 'pages/dashboard/components/subject.evaluation.row';
import CustomTableHeader from 'components/customTableHeader';
import mapScholars from 'pages/dashboard/sections/subjectEvaluation/helpers/mapScholars';
import useSort from 'hooks/useSort/index.js';
import './index.css';

/**
 * @param {object} props - component properties
 * @returns {React.Component} - component for displaying a table
 */
function SubjectEvaluationTable(props) {
	const { data } = props;
	const { headers, rows } = mapScholars(data);
	const { sortedItems, requestSort, sortConfig } = useSort(rows);

	const getClassNamesForSort = (header) => {
		if (!sortConfig) {
			return '';
		}
		return sortConfig.key === header ? sortConfig.direction : '';
	};

	return (
		<Table name='Subject-Table' className='table-container scholar'>
			<CustomTableHeader
				headers={headers}
				requestSort={requestSort}
				getClassNamesForSort={getClassNamesForSort}
			/>
			<Table.Body>
				{sortedItems.map((item, index) => (
					<SubjectEvaluationRow
						key={index}
						item={item}
						numberOfCells={headers.length}
					></SubjectEvaluationRow>
				))}
			</Table.Body>
		</Table>
	);
}

SubjectEvaluationTable.propTypes = {
	data: PropTypes.object,
};

export default SubjectEvaluationTable;
