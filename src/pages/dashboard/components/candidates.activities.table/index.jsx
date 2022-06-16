/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import mapCandidatesActivitiesToTable from 'pages/dashboard/sections/programVersions/helpers/mappers/mapCandidatesActivitiesToTable';
import CandidatesActivitiesTableRow from 'pages/dashboard/components/candidates.activities.row';
import CustomTableHeader from 'components/customTableHeader';
import CandidatesInputFilter from 'pages/dashboard/components/candidates.input.filter';
import './index.css';

/**
 * @param {object} props - component properties
 * @returns {React.Component} - component for displaying a table
 */
function CandidatesActivitiesTable(props) {
	const { value } = props;
	const { headers } = mapCandidatesActivitiesToTable(value);
	const [candidatesList, setCandidatesList] = useState(value);
	const [filterByName, setFilterByName] = useState('');

	const finteringByName = (list, query) =>
		list?.filter((element) =>
			element.person.fullName.split(' ').some((e) =>
				e
					.trim()
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.startsWith(query.toLowerCase())
			)
		);
	useEffect(() => {
		if (value && filterByName) {
			const filteredList = finteringByName(value, filterByName);
			setCandidatesList(filteredList);
		} else if (value) {
			setCandidatesList(value);
		}
	}, [value, filterByName]);
	return (
		<Table name='Candidates-Activities-Table' className='table-container'>
			<CustomTableHeader className='candidates-activitites-table' headers={headers} />
			<Table.Body className='candidates-table-body'>
				<Table.Row id='searcher-headers' className={'searcher-headers'}>
					<Table.Cell key='table-cell-1' />
					<Table.Cell key='table-cell-2'>
						<CandidatesInputFilter setFilter={setFilterByName} placeholder='Name' />
					</Table.Cell>
					<Table.Cell key='table-cell-7' />
				</Table.Row>
				{candidatesList?.map((item, index) => (
					<CandidatesActivitiesTableRow
						key={index}
						item={item}
					></CandidatesActivitiesTableRow>
				))}
			</Table.Body>
		</Table>
	);
}

CandidatesActivitiesTable.propTypes = {
	value: PropTypes.array,
};

export default CandidatesActivitiesTable;
