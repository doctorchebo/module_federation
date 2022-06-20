import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import CustomTableRow from 'pages/dashboard/components/scholar.custom.row';
import CustomTableHeader from 'components/customTableHeader';
import mapScholarsToTable from 'pages/dashboard/sections/scholars/helpers/mapScholarsToTable';
import useSort from 'hooks/useSort/index.js';

/**
 * @param {object} props - component properties
 * @returns {React.Component} - component for displaying a table
 */
function ScholarsTable(props) {
	const {
		value,
		OnGetEvents,
		openRightSideBarEvent,
		openRightSideBarProgram,
		onHideRightSidebarEvent,
	} = props;
	const { headers, rows } = mapScholarsToTable(value);
	const { sortedItems, requestSort, sortConfig } = useSort(rows);
	const getClassNamesForSort = (header) => {
		if (!sortConfig) {
			return;
		}
		return sortConfig.key === header ? sortConfig.direction : undefined;
	};
	return (
		<Table name='Scholars-Table' className='table-container'>
			<CustomTableHeader
				headers={headers}
				requestSort={requestSort}
				getClassNamesForSort={getClassNamesForSort}
			/>
			<Table.Body>
				{sortedItems.map((item, index) => (
					<CustomTableRow
						key={index}
						item={item}
						numberOfCells={headers.length}
						OnGetEvents={OnGetEvents}
						openRightSideBarEvent={openRightSideBarEvent}
						openRightSideBarProgram={openRightSideBarProgram}
						onHideRightSidebarEvent={onHideRightSidebarEvent}
					></CustomTableRow>
				))}
			</Table.Body>
		</Table>
	);
}

ScholarsTable.propTypes = {
	value: PropTypes.array,
	onSelectScholar: PropTypes.func,
	OnGetEvents: PropTypes.func,
	openRightSideBarEvent: PropTypes.func,
	openRightSideBarProgram: PropTypes.func,
	onHideRightSidebarEvent: PropTypes.func,
	resetDetail: PropTypes.bool,
};

export default ScholarsTable;
