import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; //add useHistory
import RolesForm from 'pages/dashboard/components/roles.form';
import { useRolesContext } from './../../context/rolesContext';
import {
	normalizePermissionsUpdateRole,
	normalizeNewRole,
} from 'pages/dashboard/helpers/normalize';
import './styles.css';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';

/**
 * View for users page and actions
 *
 * @returns {React.Component} Page for users
 */
export default function UpdateView() {
	const params = useParams();
	const history = useHistory();
	const [store, actions] = useRolesContext();
	const foundRole = store.roles.find((role) => {
		return role.id === params.roleId;
	});
	const currentRole = {
		name: foundRole.name,
		description: foundRole.description,
		permissions: normalizePermissionsUpdateRole(foundRole.actions, foundRole.id),
	};

	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.rolesEdit);
	}, []);

	const handleRedirect = () => {
		history.goBack();
	};
	return (
		<div className='personal-container'>
			{currentRole && (
				<RolesForm
					value={currentRole}
					title={'Edit role'}
					loading={store.loading}
					onSubmit={async (value) => {
						const payload = {
							...value,
							id: params.roleId,
						};
						await actions.onPutRole({
							data: normalizeNewRole(payload),
							handleRedirect,
						});
					}}
				/>
			)}
		</div>
	);
}
