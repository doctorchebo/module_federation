import React, { useEffect } from 'react';
import { useRolesContext } from 'pages/dashboard/sections/roles/context/rolesContext';
import RolesForm from 'pages/dashboard/components/roles.form';
import locale from 'pages/dashboard/locale/en.json';
import { normalizePermissionsNewRole, normalizeNewRole } from 'pages/dashboard/helpers/normalize';
import { useHistory } from 'react-router';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';

/**
 * @returns {React.Component} Component for Create a new role
 */
export default function CreateRole() {
	const [store, actions] = useRolesContext();
	const model = {
		name: '',
		description: '',
		permissions: normalizePermissionsNewRole(store.permissions),
	};

	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.rolesAdd);
	}, []);

	const history = useHistory();

	return (
		<>
			<div className='create-role personal-container'>
				<RolesForm
					value={model}
					title={locale.roleForm.create.title}
					onSubmit={async (value) => {
						const response = await actions.onRoleSave(normalizeNewRole(value));
						if (response.success) {
							history.goBack();
						}
					}}
				/>
			</div>
		</>
	);
}
