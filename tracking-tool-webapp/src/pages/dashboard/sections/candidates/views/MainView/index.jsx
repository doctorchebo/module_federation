import React, { useState, useEffect } from 'react';
import { Dimmer, Image, Loader, Icon as IconSearch } from 'semantic-ui-react';
import { useCandidatesContext } from '../../context';
import CandidatesTable from 'pages/dashboard/components/candidates.table';
import EmptyContent from 'assets/img/empty-list.png';
import locale from 'pages/dashboard/locale/en.json';
import Button from 'components/button';
import Icon from 'components/icon';
import { useDashBoardContext } from 'pages/dashboard/context/Context';
import validateCandidateFile from 'helpers/candidateFileValidator';
import SideBar from 'pages/dashboard/components/sidebar';
import CandidatesInputFilter from 'pages/dashboard/components/candidates.input.filter';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';
import './index.css';

/**
 * @returns {React.Component} - Component for Candidates Page.
 */
function MainView() {
	const [, sideBarActions] = useDashBoardContext();
	const [state, actions] = useCandidatesContext();
	const [candidatesList, setCandidatesList] = useState([]);
	const [filterByName, setFilterByName] = useState('');
	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.candidates);
	}, []);

	const formatObject = (field, query) =>
		field
			.trim()
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.startsWith(query.toLowerCase().trim());
	const stateParameterToFilter = (element, query, parameter) =>
		formatObject(element.person[parameter], query);
	const filterBy = (list, query) => {
		let filteredArray = [];
		filteredArray.push(
			list?.filter((element) =>
				element.person.fullName.split(' ').some((e) => formatObject(e, query))
			)
		);
		filteredArray.push(
			list?.filter((element) => stateParameterToFilter(element, query, 'fullName'))
		);
		filteredArray.push(
			list?.filter((element) => stateParameterToFilter(element, query, 'personalEmail'))
		);
		filteredArray.push(
			list?.filter((element) => stateParameterToFilter(element, query, 'phoneNumber'))
		);
		filteredArray.push(
			list?.filter((element) => formatObject(element.programVersionName, query))
		);
		let filtered =
			filteredArray[
				filteredArray.reduce(
					(maxI, el, i, arr) => (el.length > arr[maxI].length ? i : maxI),
					0
				)
			];
		return filtered;
	};
	useEffect(() => {
		if (state.candidates?.length > 0) {
			setCandidatesList(state.candidates);
		}
	}, [state.candidates]);
	useEffect(() => {
		if (state.candidates?.length > 0 && filterByName) {
			const filteredList = filterBy(state.candidates, filterByName);
			setCandidatesList(filteredList);
		} else if (state.candidates?.length > 0) {
			setCandidatesList(state.candidates);
		}
	}, [filterByName]);

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
	 * load the programs in progress
	 */
	function handleOnLoadCandidates() {
		actions.onLoadCandidates();
	}

	useEffect(() => {
		handleOnLoadCandidates();
		handleOnLoadProgramsVersions();
		handleOnLoadStatus();
	}, []);

	return (
		<div className='personal-container'>
			<SideBar actions={actions} state={state} validateFunction={validateCandidateFile} />
			<div className={'section-header'}>
				<div className={'title'}>{state.title}</div>
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
			<div id='custom-fitlter-search'>
				<CandidatesInputFilter
					setFilter={setFilterByName}
					placeholder={locale.searchPlaceHolder}
				/>
				<IconSearch name='search' />
			</div>
			{candidatesList?.length > 0 ? (
				<CandidatesTable value={candidatesList} actions={actions} />
			) : (
				<div className={'empty-content'}>
					<Image disabled src={EmptyContent} />
				</div>
			)}
		</div>
	);
}

export default MainView;
