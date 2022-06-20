import React, { useEffect } from 'react';
import locale from './locale/en.json';
import { Image } from 'semantic-ui-react';
import EmptyContent from 'assets/img/pet.png';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';
import './index.css';

/**
 * @returns {React.Component} - Component for Dashboard Home View.
 */
function HomeView() {
	const { welcome } = locale;
	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.dashboard);
	}, []);

	return (
		<div className='home personal-container'>
			<div className={'container'}>
				<div className={'image'}>
					<Image src={EmptyContent} size={'small'} />
				</div>
				<div className={'title'}>{welcome}</div>
			</div>
		</div>
	);
}
export default HomeView;
