import { Column, Table, SortDirection, WindowScroller } from 'react-virtualized';
import { Checkbox, Image } from 'semantic-ui-react';
import React, { useState } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { useSubjectDetailsContext } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';
import { imageProfile } from 'helpers/Dashboard';
import Noop from 'helpers/Noop';
import './index.css';
import 'react-virtualized/styles.css';

/**
 * @param {object} props - properties
 * @returns {React.Component} table scholars component
 */
export default function SubjectsBulkScholarTable(props) {
	const { value: model, onSelect } = props;

	const [state] = useSubjectDetailsContext();

	const [sortBy, setSortBy] = useState('id');
	const [sortDirection, setSortDirection] = useState('ASC');
	const [sortedList, setSortedList] = useState(state.scholars);
	const [checked, setChecked] = useState([]);

	const onChangeHeaderCheckbox = (data) => {
		setChecked([]);
		model.splice(0, model.length);
		if (data.checked) {
			setChecked(sortedList.map((row) => row.id));
			sortedList.map((item) => model.push(item.id));
		}
		onSelect(model.length > 0);
	};

	const addScholarSelected = (scholarId) => {
		model.push(scholarId);
	};
	const DeleteScholarSelected = (scholarId) => {
		const index = model.indexOf(scholarId);
		index > -1 && model.splice(index, 1);
	};

	const onChangeRowCheckbox = (data) => {
		const newRow = sortedList[data.index].id;
		checked.includes(newRow)
			? setChecked((old) => old.filter((row) => row !== newRow))
			: setChecked((old) => [...old, newRow]);
		if (data.checked) {
			addScholarSelected(newRow);
		} else {
			DeleteScholarSelected(newRow);
		}
		onSelect(model.length > 0);
	};

	/**
	 * Get scholar list and order
	 *
	 * @param {string} root0 Get all scholars and later order
	 * @param {string} root0.sortBy Order the list by type
	 * @param {string} root0.sortDirection Order the scholar list Asc or Desc
	 * @returns {Array} Returns an array of scholars.
	 */
	function sortList({ sortBy, sortDirection }) {
		const newList = _.sortBy(state.scholars, [sortBy]);
		if (sortDirection === SortDirection.DESC) {
			newList.reverse();
		}
		return newList;
	}

	/**
	 * Put the values in the fields
	 *
	 * @param {string} root0 Get all scholars and later order
	 * @param {string} root0.sortBy Order the list by type
	 * @param {string} root0.sortDirection Order the scholar list Asc or Desc
	 */
	function sort({ sortBy, sortDirection }) {
		setSortBy(sortBy);
		setSortDirection(sortDirection);
		setSortedList(sortList({ sortBy, sortDirection }));
	}

	/**
	 * Show the fields in the table and and these have the sort field
	 *
	 * @param {string} dataKey Is the field in the table, in this case scholarName
	 * @param {Int32Array} rowIndex Is the number of row
	 * @returns {React.Component} Returns a header in the table.
	 */
	function renderCells(dataKey, rowIndex) {
		return (
			<>
				<div
					index={rowIndex}
					role='gridcell'
					style={
						dataKey === 'scholarName'
							? { color: 'var(--primary-color)', fontSize: '16px' }
							: {}
					}
					className={'dataKeyHeader'}
				>
					{sortedList[rowIndex][dataKey]}
				</div>
			</>
		);
	}

	return (
		<>
			<div>
				<WindowScroller>
					{() => (
						<Table
							bordered
							cellBordered
							width={2000}
							height={500}
							headerHeight={30}
							rowHeight={100}
							sort={sort}
							sortBy={sortBy}
							sortDirection={sortDirection}
							rowCount={sortedList.length}
							rowGetter={({ index }) => sortedList[index]}
							className={'bulkTable'}
						>
							<Column
								disableSort
								dataKey='checkbox'
								width={40}
								headerRenderer={() => (
									<Checkbox
										indeterminate={
											checked.length > 0 && checked.length < sortedList.length
										}
										checked={checked.length === sortedList.length}
										onChange={(e, data) => onChangeHeaderCheckbox(data)}
									/>
								)}
								cellRenderer={({ rowIndex }) => (
									<Checkbox
										checked={checked.includes(sortedList[rowIndex].id) === true}
										onChange={(e, data) => onChangeRowCheckbox(data)}
										index={rowIndex}
									/>
								)}
							/>
							<Column
								dataKey='image'
								width={50}
								cellRenderer={({ rowIndex }) => (
									<>
										<Image spaced circular size='mini' src={imageProfile} />
									</>
								)}
							/>
							<Column
								dataKey='scholarName'
								label='User'
								width={2000}
								cellRenderer={({ dataKey, rowIndex }) =>
									renderCells(dataKey, rowIndex)
								}
							/>
						</Table>
					)}
				</WindowScroller>
			</div>
		</>
	);
}

SubjectsBulkScholarTable.propTypes = {
	value: PropTypes.array.isRequired,
	onSelect: PropTypes.func.isRequired,
};

SubjectsBulkScholarTable.defaultProps = {
	value: [],
	onSelect: Noop,
};
