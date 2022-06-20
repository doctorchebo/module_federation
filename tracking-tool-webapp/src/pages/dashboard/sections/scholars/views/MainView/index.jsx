import PaginationComponent from 'components/Pagination';
import React, { useEffect, useRef, useState } from 'react';
import { Dimmer, Image, Loader } from 'semantic-ui-react';
import { useApplication } from 'application/context/AppContext';
import { useDashBoardContext, useSearchFilterContext } from 'pages/dashboard/context/Context';
import { useScholarsContext } from '../../context';
import SideBar from 'pages/dashboard/components/sidebar';
import ScholarsTable from 'pages/dashboard/components/scholars.table';
import validateScholarFile from 'helpers/scholarFileValidators';
import Button from 'components/button';
import Icon from 'components/icon';
import EmptyContent from 'assets/img/empty-list.png';
import locale from 'pages/dashboard/locale/en.json';
import MenuDropdown from 'components/menu';
import {
	mapProgramVersionOptions,
	mapStatusTypeOptions,
	mapApplicantsTypeOptions,
} from '../../helpers/mapOptionsForFilter';
import { convertProgramsToOptions } from '../../helpers/normalize';
import Search from 'pages/dashboard/components/search';
import ScholarSideBarHeader from 'pages/dashboard/components/scholar.sidebar.header';
import ScholarProgramForm from 'pages/dashboard/components/scholars.program.form';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';

/**
 * @returns {React.Component} - Component for Scholars Page.
 */
function MainView() {
	const [applicationState, appActions] = useApplication();
	const [state, actions] = useScholarsContext();
	const [, sideBarActions] = useDashBoardContext();
	const [options, selectOptions] = useState([]);
	const [
		filterValue,
		filterField,
		searchValue,
		selectFilter,
		selectFilterValue,
		selectSearchValue,
	] = useSearchFilterContext();

	const searchValueRef = useRef('');
	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.scholar);
	}, []);

	/**
	 * Changes the page values on change
	 *
	 * @param {*} pageNumber Number selected
	 */
	function handleOnPageChanged(pageNumber) {
		actions.changePaginator(!state.isChangePaginator);
		actions.onLoadScholars({ pageNumber });
	}

	/**
	 * load the programs in progress
	 */
	function handleOnLoadPrograms() {
		actions.onLoadProgramsInProgress();
	}

	/**
	 * Load the programs versions
	 */
	function handleOnLoadProgramsVersions() {
		actions.onLoadProgramVersions();
	}

	/**
	 * Load the status type for scholar
	 */
	function handleOnLoadStatus() {
		actions.onLoadStatus();
	}
	/**
	 * Load the applicants type
	 */
	function handleOnLoadApplicantsTypes() {
		actions.onLoadApplicantsTypes();
	}

	/**
	 * Changes the filter and search values on change
	 */
	function handleOnFilterChanged() {
		actions.onLoadScholars({
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
			mapProgramVersionOptions(state.programVersions),
			mapStatusTypeOptions(state.statusType),
			mapApplicantsTypeOptions(state.applicantsType),
		];
		selectOptions(options);
	}

	useEffect(() => {
		setOptions();
	}, [state]);

	useEffect(() => {
		selectSearchValue(searchValueRef.current);
		handleOnFilterChanged();
	}, [filterValue]);

	useEffect(() => {
		handleOnFilterChanged();
	}, [searchValue]);

	useEffect(() => {
		if (applicationState.sidebarHistory.length === 0) {
			handleOnPageChanged(state.pagination.currentPage);
			handleOnLoadPrograms();
			handleOnLoadProgramsVersions();
			handleOnLoadStatus();
			handleOnLoadApplicantsTypes();
		}
	}, [applicationState.sidebarHistory]);

	return (
		<div className='personal-container scholar-table'>
			<SideBar actions={actions} state={state} validateFunction={validateScholarFile} />
			<div className={'section-header'}>
				<div className={'title'}>{'Scholars'}</div>
				<Button
					basic
					floated={'right'}
					onClick={() => {
						sideBarActions.onImporting(true);
						sideBarActions.onDimmed(true);
					}}
					content='Import'
					icon={<Icon name={'cloud-upload'} />}
					className='btn-import'
				/>
			</div>
			<Dimmer inverted active={state.loading}>
				<Loader />
			</Dimmer>
			<MenuDropdown
				placeholder={locale.filter}
				options={options}
				selectFilter={selectFilter}
				selectFilterValue={selectFilterValue}
			/>
			<Search
				action={actions.onLoadScholars}
				selectSearchValue={selectSearchValue}
				filterField={filterField}
				filterValue={filterValue}
				searchValueRef={searchValueRef}
			/>
			{state.scholars.length > 0 ? (
				<ScholarsTable
					value={state.scholars}
					userAction={(scholarId) => actions.getScholarEvents(scholarId)}
					OnGetEvents={actions.onGetEvents}
					openRightSideBarEvent={appActions.onSidebarAddView}
					openRightSideBarProgram={(item) => {
						appActions.onSidebarAddView({
							header: null,
							content: (
								<>
									<ScholarSideBarHeader
										user={item?.User}
										title={locale.program}
									/>
									<ScholarProgramForm
										scholar={item}
										form={locale.scholars.changeProgramForm}
										programs={convertProgramsToOptions(
											state.programsInProgress
										)}
										onCancel={() => appActions.onHideSidebar()}
										onSubmit={(value) => {
											const newProgramVersion = {
												scholarId: item.id,
												programVersionId: value.programId,
												description: value.description,
											};
											actions.onChangeProgramVersion(newProgramVersion);
											appActions.onHideSidebar();
										}}
									/>
								</>
							),
							footer: null,
						});
					}}
					onHideRightSidebarEvent={() => {
						appActions.onHideSidebar();
						appActions.onShareInformation({ eventFormValues: {} });
						//TODO: Create an task to avoid having to reload the scholar list
						//when the scholars status is changed
						handleOnFilterChanged();
					}}
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
