import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import SideMenu from '../../components/sideMenu';
import TopMenu from '../../components/topMenu';
import { Sidebar, Segment } from 'semantic-ui-react';
import DashboardRoutes from '../../route';
import { useApplication } from 'application/context/AppContext';
import RightSidebar from 'components/rightSidebarNew';
import { BreadcrumbsDataProvider } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';

/**
 * @returns {React.Component} -
 */
function MainView() {
	const [session, actions] = useApplication();
	const { path } = useRouteMatch('/dashboard');

	const getLastSidebarHistoryItem = () => {
		return session.sidebarHistory[session.sidebarHistory.length - 1] || {};
	};

	return (
		<div className='dashboard-wrapper'>
			<Sidebar.Pushable className='sidebar-main' as={Segment}>
				<Sidebar.Pusher dimmed={session.dimmed}>
					<SideMenu actions={() => {}}></SideMenu>
					<div className='side-menu-main'>
						<div className='side-menu-none'></div>
						<div className='side-menu-content'>
							<BreadcrumbsDataProvider>
								<TopMenu actions={actions} session={session} />
								<DashboardRoutes path={path} />
							</BreadcrumbsDataProvider>
						</div>
					</div>
				</Sidebar.Pusher>
				<RightSidebar
					onHide={() => {
						actions.onHideSidebar();
					}}
					visible={session.dimmed}
					{...getLastSidebarHistoryItem()}
				/>
			</Sidebar.Pushable>
		</div>
	);
}

export default MainView;
