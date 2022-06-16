import React, { useEffect, useState } from 'react';
import RolesTable from 'pages/dashboard/components/roles.table';
import { Dimmer, Image, Loader } from 'semantic-ui-react';
import Button from 'components/button';
import Icon from 'components/icon';
import { useRolesContext } from 'pages/dashboard/sections/roles/context/rolesContext';
import EmptyContent from 'assets/img/empty-list.png';
import PaginationComponent from 'components/Pagination';
import { Link } from 'react-router-dom';
import locale from 'pages/dashboard/sections/roles/locale/en.json';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';
import './index.css';

/**
 * View for users page and actions
 *
 * @returns {React.Component} Page for users
 */
export default function RolesMainView() {
	const [state, actions] = useRolesContext();
	const pagination = state.pagination;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentRolId, setCurrentRolId] = useState('');
	const [modalMessage, setModalMessage] = useState('');

	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.roles);
	}, []);

	/**
	 *
	 * @param {number} page  Current number page of pagination
	 */
	function handleOnPageChange(page) {
		actions.onLoadRoles({ page });
	}

	/**
	 *
	 * @param {string} id role id
	 * @param {string} name role name
	 */
	function handleShowModal(id = '', name = '') {
		setIsModalOpen(!isModalOpen);
		setCurrentRolId(id);
		setModalMessage(locale.confirmModal.content.replace('%s', name));
	}

	useEffect(() => {
		handleOnPageChange(state.pagination.currentPage);
		actions.onLoadPermissions();
	}, []);

	return (
		<div className='main personal-container'>
			<div className={'section-header'}>
				<div className={'title'}>{locale.title}</div>
				<Button
					basic
					as={Link}
					content={locale.bulkEditButton}
					icon={<Icon name={'pencil-alt'} />}
					className='button'
					to='/dashboard/roles/edit'
				/>
				<Button
					basic
					as={Link}
					content={locale.add}
					icon={<Icon name={'plus'} />}
					className='button'
					to='/dashboard/roles/add'
				/>
			</div>
			<Dimmer inverted active={state.loading}>
				<Loader />
			</Dimmer>
			{state.roles.length ? (
				<RolesTable
					roles={state.roles}
					modal={{
						header: locale.confirmModal.header,
						isOpen: isModalOpen,
						setIsOpen: setIsModalOpen,
						onShow: handleShowModal,
						message: modalMessage,
					}}
					onDelete={() => {
						actions.onRoleDelete(currentRolId);
					}}
				/>
			) : (
				<div className={'empty-content'}>
					<Image disabled src={EmptyContent} />
				</div>
			)}
			<PaginationComponent
				currentPage={pagination.currentPage}
				totalPages={pagination.totalPages}
				pageSize={pagination.pageSize}
				totalResults={pagination.totalCount}
				onPageChanged={handleOnPageChange}
			/>
		</div>
	);
}
