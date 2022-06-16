import React, { useEffect, useRef, useState } from 'react';
import { usersTitle } from 'helpers/Dashboard';
import UsersTable from 'pages/dashboard/components/table';
import { Dimmer, Image, Loader } from 'semantic-ui-react';
import { useUsersContext } from 'pages/dashboard/sections/users/context/usersContext';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';
import { useDashBoardContext } from 'pages/dashboard/context/Context';
import { useRolesContext } from 'pages/dashboard/sections/roles/context/rolesContext';
import SideBar from 'pages/dashboard/components/sidebar';
import validateUserFile from 'helpers/userFileValidators';
import Button from 'components/button';
import Icon from 'components/icon';
import EmptyContent from 'assets/img/empty-list.png';
import Search from 'pages/dashboard/components/search';
import locale from 'pages/dashboard/locale/en.json';
import MenuDropdown from 'components/menu';
import PaginationComponent from 'components/Pagination';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';

/**
 * View for users page and actions
 *
 * @returns {React.Component} Page for users
 */
export default function MainView() {
	const [state, actions] = useUsersContext();
	const [, sideBarActions] = useDashBoardContext();
	const [, setFilterOption] = useState();
	const [, setSearchValue] = useState();
	const [rolesState, rolesActions] = useRolesContext();
	const pagination = state.pagination;
	const [, breadcrumbsActions] = useBreadcrumbsContext();
	const searchValueRef = useRef('');
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.user);
	}, []);

	/**
	 * generates the role options to send to the filter
	 *
	 * @param {string} roles - roles to set as options
	 * 	@returns {string} options for menu drop down
	 */
	function generateOptions(roles) {
		let currentRoles = [];
		if (roles !== undefined) {
			currentRoles = roles.map((role) => ({
				key: role.id,
				text: role.name,
				value: role.name,
			}));
		}

		currentRoles.push({ text: locale.users.allRoles, value: '' });
		return [{ name: locale.users.rolesLabel, list: currentRoles }];
	}

	/**
	 * it going to filter by selected value
	 *
	 * @param {string} value - filter value
	 */
	function filter(value) {
		if (value === undefined) {
			value = pagination.filterValue;
		}
		actions.onUsersLoad({
			pageNumber: pagination.currentPage,
			pageSize: pagination.pageSize,
			sort: pagination.sort,
			totalPages: pagination.totalPages,
			filterValue: value,
			filterOption: locale.users.pagination.defaultFilerOption,
			criteria: pagination.criteria,
		});
	}

	useEffect(() => {
		handleOnPageChanged(pagination.page);
		sideBarActions.setImportContent({
			handleImport: actions.onUsersValidate,
			validateFunction: validateUserFile,
		});
		rolesActions.onLoadRoles();
	}, []);

	const handleOnPageChanged = (page) => {
		if (page === undefined) {
			page = pagination.currentPage;
		}
		actions.onUsersLoad({
			pageNumber: page,
			pageSize: pagination.pageSize,
			sort: pagination.sort,
			totalPages: pagination.totalPages,
			filterValue: pagination.filterValue,
			filterOption: pagination.filterOption,
			criteria: pagination.criteria,
		});
	};

	return (
		<div className='personal-container'>
			<SideBar actions={actions} state={state} validateFunction={validateUserFile} />
			<div className={'section-header'}>
				<div className={'title'}>{usersTitle}</div>
				<Button
					basic
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
				placeholder={
					locale.users.filter +
					(state.pagination.filterOption !== undefined
						? state.pagination.filterOption
						: '')
				}
				options={generateOptions(rolesState.roles) || {}}
				selectFilter={setFilterOption}
				selectFilterValue={filter}
			/>
			<Search
				action={actions.searchUser}
				selectSearchValue={setSearchValue}
				searchValueRef={searchValueRef}
				filterValue={pagination.filterValue}
				filterField={pagination.filterOption}
				pageNumber={locale.users.pagination.defaultPage}
				pageSize={pagination.pageSize}
				sort={pagination.sort}
				totalPages={pagination.totalPages}
			/>
			{state.users.length > 0 ? (
				<UsersTable
					users={state.users}
					roles={rolesState.roles}
					userActions={actions}
					pagination={pagination}
				/>
			) : (
				<div className={'empty-content'}>
					<Image disabled src={EmptyContent} />
				</div>
			)}
			<PaginationComponent {...pagination} onPageChanged={handleOnPageChanged} />
		</div>
	);
}
