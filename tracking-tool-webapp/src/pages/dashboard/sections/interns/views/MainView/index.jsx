import React, { useEffect } from 'react';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';

/**
 * @returns {React.Component} - Component for Candidates Page.
 */
function MainView() {
	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.interns);
	}, []);
	return <h1>Interns</h1>;
}

export default MainView;
