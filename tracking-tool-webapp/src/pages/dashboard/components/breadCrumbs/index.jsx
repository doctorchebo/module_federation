import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import TextIcon from '../textIcon/index';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';
import './index.css';
/**
 * breadCrumbs to use on import in the page
 *
 * @returns {*} breadCrumbs component
 */
export default function BreadCrumbs() {
	const [state] = useBreadcrumbsContext();
	return (
		<div className={'wrapper-breadcrumbs'}>
			<div className={'wrapper-breadcrumbs__icons'}>
				<TextIcon color='grey' name={state.breadCrumbs.icon} />
			</div>
			<Breadcrumb sections={state.breadCrumbs.list} />
		</div>
	);
}
