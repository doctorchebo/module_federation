import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import EmptyContent from 'assets/img/empty-list.png';
import locale from './../locale/en.json';
import MenuDropdown from 'components/menu';
import PaginationComponent from 'components/Pagination';
import SubjectEvaluationTable from 'pages/dashboard/components/subject.evaluation.table';
import { useApplication } from 'application/context/AppContext';
import { useScholarsContext } from '../context';

/**
 * @returns {React.Component} - Component for subject Page.
 */
export default function MainView() {
	const [applicationState] = useApplication();
	const [state, actions] = useScholarsContext();
	const { id } = useParams();
	const [options, setOptions] = useState();
	const [, setFilterOption] = useState();
	const [filterValueSelected, setFilterValueSelected] = useState('');

	/**
	 * Changes the page values on change
	 *
	 * @param {*} pageNumber Number selected
	 */
	function handleOnPageChanged(pageNumber) {
		if (options) {
			actions.onLoadStage({
				pageNumber: pageNumber,
				programVersionId: id,
				stageId: state.stages.at(-1).id,
			});
		}
	}

	/**
	 * generates the stages options to send to the filter
	 */
	function generateOptions() {
		const currentRoles = state.stages.map((stage) => ({
			text: stage.name,
			value: stage.id,
		}));
		setOptions([{ name: 'Select', list: currentRoles }]);
	}

	/**
	 * it going to filter by selected value
	 *
	 * @param {string} value - filter value
	 */
	function filter(value) {
		const filter = {
			pageNumber: 1,
			programVersionId: id,
			stageId: value,
		};
		actions.onLoadStage(filter);
	}

	useEffect(() => {
		if (state.stages.length) {
			generateOptions();
		}
	}, [state.stages]);

	useEffect(() => {
		if (options) {
			let lastStage = state.stages.at(-1);
			filter(lastStage.id);
			setFilterValueSelected(`${lastStage.name}`);
		}
	}, [options]);

	useEffect(() => {
		actions.onGetStages(id);
	}, []);

	useEffect(() => {
		if (applicationState.sidebarHistory.length === 0) {
			handleOnPageChanged(state.pagination.currentPage);
		}
	}, [applicationState.sidebarHistory]);
	return (
		<div className='personal-container'>
			<div className={'section-header'}>
				<div className={'title'}>{locale.title}</div>
			</div>
			<MenuDropdown
				placeholder={locale.filter + filterValueSelected}
				options={options}
				selectFilter={setFilterOption}
				selectFilterValue={filter}
			></MenuDropdown>
			{state.scholars.scholars?.length ? (
				<SubjectEvaluationTable data={state} />
			) : (
				<div className={'empty-content'}>
					<Image disabled src={EmptyContent} />
				</div>
			)}
			<PaginationComponent
				currentPage={state.pagination.currentPage}
				totalPages={state.pagination.totalPages}
				pageSize={state.pagination.pageSize}
				totalResults={state.pagination.totalCount}
				onPageChanged={handleOnPageChanged}
			/>
		</div>
	);
}

MainView.propTypes = {
	numberOfCells: PropTypes.number,
	children: PropTypes.node,
};

MainView.defaultProps = {
	scholarCount: 0,
};
