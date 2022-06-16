import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useEventsStore } from 'store/eventsSlice/useEventStore';
import EventList from 'pages/dashboard/components/eventsManager/components/eventList';
import { Button, Container, Icon } from 'semantic-ui-react';
import locale from 'pages/dashboard/components/eventsManager/locale/en.json';
import UpdateForm from '../UpdateForm';
import CreateForm from '../CreateForm';
import PaginationComponent from 'components/Pagination';
import MenuDropdown from 'components/menu';
import {
	eventTypesToOptions,
	subjectToOptions,
	stagesToOptions,
	authorsToOptions,
} from 'pages/dashboard/components/eventsManager/helpers/normalize';
import AttachmentList from '../event.attachments';
import Search from 'pages/dashboard/components/search';
import { useApplication } from 'application/context/AppContext';
import RightSidebarEvent from 'pages/dashboard/components/RightSidebarEvent';

/**
 * @param {object} props - component properties
 * @param {object} props.user - user object
 * @param {object} props.event - event object
 * @param {object} props.displayNewView - boolean
 * @returns {React.Component} - view component for list of cards.
 */
function EventCardListView(props) {
	const [appState, appActions] = useApplication();
	const { state, actions } = useEventsStore();
	const [options, setOptions] = useState();
	const [filterSelected, setFilterSelected] = useState('');
	const [filterValueSelected, setFilterValueSelected] = useState('');
	const [searchValue, selectSearchValue] = useState('');
	const searchValueRef = useRef('');
	const FIRST_PAGE = 1;

	/**
	 * Changes the filter and search values on change
	 *
	 * @param {object} pageNumber - Page number
	 */
	function handleOnFilterChanged(pageNumber) {
		if (state.selectedScholar.id === props.user.id) {
			actions.onSearchEvent({
				searchValue: searchValue,
				filterField: filterSelected,
				filterValue: filterValueSelected,
				scholarId: state.selectedScholar.id,
				pagenumber: pageNumber,
			});
		}
	}

	/**
	 * generates the options to send the filter
	 */
	function generateOptions() {
		const filters = [
			{
				name: locale.filters.types.name,
				key: locale.filters.types.key,
				list: eventTypesToOptions(state.eventTypes),
			},
			{
				name: locale.filters.authors.name,
				key: locale.filters.authors.key,
				list: authorsToOptions(state.authors),
			},
			{
				name: locale.filters.stages.name,
				key: locale.filters.stages.key,
				list: stagesToOptions(state.stages),
			},
			{
				name: locale.filters.subjects.name,
				key: locale.filters.subjects.key,
				list: subjectToOptions(state.stages),
			},
		];
		setOptions(filters);
	}

	/**
	 * a skeleton to add sidebar view for update and edit
	 *
	 * @param {object} component - the component that will be opened on the side bar
	 */
	const addSideBarView = (component) => {
		appActions.onSidebarAddView({
			header: null,
			content: component,
			footer: null,
			onHide: () => {
				appActions.onHideSidebar();
				appActions.onShareInformation({ eventFormValues: {} });
				handleOnFilterChanged(FIRST_PAGE);
			},
		});
	};

	useEffect(() => {
		actions.onGetStages(state.selectedScholar.programVersionId);
		actions.onGetEventTypes();
		actions.onGetSubjects();
		actions.onGetAuthors();
		handleOnFilterChanged(state.pagination.currentPage);
	}, []);

	useEffect(() => {
		generateOptions();
	}, [state.eventTypes, state.authors, state.stages]);

	useEffect(() => {
		selectSearchValue(searchValueRef.current);
		handleOnFilterChanged(state.pagination.currentPage);
	}, [filterValueSelected]);

	useEffect(() => {
		handleOnFilterChanged(state.pagination.currentPage);
	}, [searchValue]);

	useEffect(() => {
		handleOnFilterChanged(FIRST_PAGE);
	}, [state.selectedScholar.id]);

	useEffect(() => {
		handleOnFilterChanged(FIRST_PAGE);
	}, [appState.sidebarHistory]);
	return (
		<div className={'events'}>
			<Container textAlign='right'>
				<Button
					key='add-event-btn'
					className='add-event-btn'
					onClick={() => {
						if (props.displayNewView) {
							addSideBarView(
								<RightSidebarEvent
									item={props.user}
									eventForm={true}
									statusForm={false}
									displayNewView={props.displayNewView}
								/>
							);
						} else {
							actions.onAddView(<CreateForm />);
						}
					}}
				>
					{locale.event.btnName}
					<Icon name='add' />
				</Button>
			</Container>

			<MenuDropdown
				placeholder='Filters'
				options={options}
				selectFilter={setFilterSelected}
				selectFilterValue={setFilterValueSelected}
			/>

			<Search
				selectSearchValue={selectSearchValue}
				searchValueRef={searchValueRef}
				filterField={filterSelected}
				filterValue={filterValueSelected}
			/>

			<EventList
				onAction={(event) => {
					actions.onSelectEvent(event);
					if (props.displayNewView) {
						addSideBarView(
							<RightSidebarEvent
								item={props.user}
								updateForm={true}
								statusForm={false}
								displayNewView={props.displayNewView}
								data={event}
							/>
						);
					} else {
						actions.onAddView(<UpdateForm />);
					}
				}}
				onActionViewContent={(event) => {
					actions.onGetAttachments(event);
					actions.onSelectEvent(event);
					appActions.onShareInformation({ eventValues: event });
					actions.onAddView(<AttachmentList />);
				}}
				events={state?.scholarEvents || []}
			/>

			<PaginationComponent
				currentPage={state.pagination.currentPage}
				totalPages={state.pagination.totalPages}
				pageSize={state.pagination.pageSize}
				totalResults={state.pagination.totalCount}
				onPageChanged={handleOnFilterChanged}
			/>
		</div>
	);
}

EventCardListView.propTypes = {
	user: PropTypes.object,
	event: PropTypes.object,
	showFormEvent: PropTypes.bool,
	displayNewView: PropTypes.bool,
};

export default EventCardListView;
