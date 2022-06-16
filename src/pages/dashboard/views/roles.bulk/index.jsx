import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useRolesContext } from 'pages/dashboard/sections/roles/context/rolesContext';
import { normalizePermissionsNewRole } from 'pages/dashboard/helpers/normalize';
import RolesBulkForm from 'pages/dashboard/components/roles.bulk.form';
import locale from 'pages/dashboard/locale/en.json';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';

/**
 * View for Bulk Edit
 *
 * @returns {React.Component} - Page View for Bulk Edit
 */
export default function BulkEditView() {
	const history = useHistory();
	const [state, actions] = useRolesContext();
	const [isRoleSelected, setIsRoleSelected] = useState(false);

	const modelBulkEdit = {
		permissions: normalizePermissionsNewRole(state.permissions),
		idsOfRoles: [],
	};

	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.rolesEdit);
	}, []);

	const handleRedirect = () => {
		history.goBack();
	};

	return (
		<div>
			<RolesBulkForm
				items={state.roles}
				value={modelBulkEdit}
				title={locale.roles.bulkEditForm.title}
				loading={state.loading}
				selected={isRoleSelected}
				onSelectRole={setIsRoleSelected}
				onSubmit={async (value) => {
					const payload = {
						...value,
					};
					await actions.onBulkEditRoles({
						data: payload,
						handleRedirect,
					});
				}}
			/>
		</div>
	);
}
