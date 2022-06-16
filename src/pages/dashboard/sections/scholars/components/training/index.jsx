import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import CustomTableHeader from 'components/customTableHeader';
import useSort from 'hooks/useSort';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';
import { useParams } from 'react-router-dom';
import { ConvertToMonthYear } from 'helpers/dateConverter';
import SummaryItem from './item';
/**
 * @returns {React.Component} -
 */
export default function Training() {
	const [state, actions] = useScholarDetailContext();
	const { id } = useParams();

	useEffect(() => {
		actions.onGetTrainingsByScholar(id);
	}, []);

	const headers = ['all', 'version', 'stage', 'grade', 'duration', ''];

	const rows = state.trainnings.map((item) => {
		const average = item.stage === 'Completed' ? item.grade : '0';
		return {
			version: item.programVersion,
			stage: item.stage,
			duration:
				ConvertToMonthYear(item.startDate) + ' to ' + ConvertToMonthYear(item.endDate),
			grade: average,
			stageData: {
				scholarId: id,
				programVersionId: item.programVersionId,
			},
		};
	});

	const { sortedItems, requestSort, sortConfig } = useSort(rows);
	const getClassNamesForSort = (header) => {
		if (!sortConfig) {
			return;
		}
		return sortConfig.key === header ? sortConfig.direction : undefined;
	};
	return (
		<Table className='table-container table-training'>
			<CustomTableHeader
				headers={headers}
				requestSort={requestSort}
				getClassNamesForSort={getClassNamesForSort}
			/>
			<Table.Body>
				{sortedItems.map((item, index) => (
					<SummaryItem item={item} key={index} />
				))}
			</Table.Body>
		</Table>
	);
}
