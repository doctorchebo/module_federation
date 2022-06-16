import React, { useEffect } from 'react';
import { useApplication } from 'application/context/AppContext';
import CardProfile from './components/card';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';
import './index.css';

/**
 * @returns {React.Component} -
 */
export default function Profile() {
	const [state, actions] = useApplication();
	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.profile);
		actions.onProfile();
	}, []);

	return (
		<div className='background'>
			<CardProfile profile={state.profile} role={state.role} actions={actions} />
		</div>
	);
}
