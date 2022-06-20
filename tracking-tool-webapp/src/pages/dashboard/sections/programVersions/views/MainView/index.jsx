import PaginationComponent from 'components/Pagination';
import React, { useEffect, useRef, useState } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { useDashBoardContext, useSearchFilterContext } from 'pages/dashboard/context/Context';
import { useProgramVersionsContext } from '../../context';
import SideBar from 'pages/dashboard/components/sidebar';
import locale from '../../locale/en.json';
import validateProgramVersionFile from 'helpers/programVersionFileValidators';
import ProgramVersionsTable from 'pages/dashboard/components/program.versions.table';
import Button from 'components/button';
import Icon from 'components/icon';
import { Image } from 'semantic-ui-react';

import { useApplication } from 'application/context/AppContext';
import EmptyContent from 'assets/img/empty-list.png';
import Search from './../../../../components/search';
import MenuDropdown from 'components/menu';
import {
	mapProgramOptions,
	mapCoordinatorOptions,
	mapStatusOption,
} from '../../helpers/mapOptionsForFilter';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';

/**
 * @returns {React.Component} - Component for Program Versions Main View.
 */
function MainView() {
	const [state, actions] = useProgramVersionsContext();
	const [
		filterValue,
		filterField,
		searchValue,
		selectFilter,
		selectFilterValue,
		selectSearchValue,
	] = useSearchFilterContext();
	const [, sideBarActions] = useDashBoardContext();
	const { title } = locale;
	const [, appActions] = useApplication();
	const [options, selectOptions] = useState([]);
	const searchValueRef = useRef('');

	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.programs);
	}, []);

	/**
	 * Changes the page values on change
	 *
	 * @param {*} pageNumber Number selected
	 */
	function handleOnPageChanged(pageNumber) {
		actions.onLoadProgramVersions({ pageNumber });
	}
	/**
	 * Changes the filter and search values on change
	 */
	function handleOnFilterChanged() {
		actions.onLoadProgramVersions({
			searchValue: searchValue,
			filterField: filterField,
			filterValue: filterValue,
		});
	}
	/**
	 * Changes the filter options values on change
	 */
	function setOptions() {
		const options = [
			mapStatusOption(state.status),
			mapProgramOptions(state.programs),
			mapCoordinatorOptions(state.coordinators),
		];
		selectOptions(options);
	}

	useEffect(() => {
		handleOnPageChanged(state.pagination.currentPage);
	}, []);

	useEffect(() => {
		actions.onLoadProgramVersionsStatus();
		actions.onLoadPrograms();
		actions.onLoadCoordinators();
		setOptions();
	}, [state.loading]);

	useEffect(() => {
		selectSearchValue(searchValueRef.current);
		handleOnFilterChanged();
	}, [filterValue]);

	useEffect(() => {
		handleOnFilterChanged();
	}, [searchValue]);

	return (
		<div className='personal-container'>
			<SideBar
				actions={actions}
				state={state}
				validateFunction={validateProgramVersionFile}
				onDimmed={appActions.onDimmedSidebar}
			/>
			<div className={'section-header'}>
				<div className={'title'}>{title}</div>
				<Button
					basic
					icon={<Icon name={'cloud-upload'} />}
					onClick={() => {
						sideBarActions.onImporting(true);
						sideBarActions.onDimmed(true);
					}}
					content='Import'
					className='btn-import'
				/>
			</div>
			<Dimmer inverted active={state.loading}>
				<Loader />
			</Dimmer>
			<MenuDropdown
				placeholder={locale.filter + filterValue}
				options={options}
				selectFilter={selectFilter}
				selectFilterValue={selectFilterValue}
			/>
			<Search
				action={actions.onLoadProgramVersions}
				selectSearchValue={selectSearchValue}
				searchValueRef={searchValueRef}
				filterField={filterField}
				filterValue={filterValue}
			/>
			{state.programVersions.length > 0 ? (
				<ProgramVersionsTable
					value={state.programVersions}
					onSendReports={actions.OnSendEvaluationReports}
					onSidebarOpen={appActions.onSidebarAddView}
				/>
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

export default MainView;
