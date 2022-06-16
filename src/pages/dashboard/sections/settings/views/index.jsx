import React from 'react';
import { Button, Container } from 'semantic-ui-react';
import { useApplication } from 'application/context/AppContext';
import RightSidebarGrades from 'pages/dashboard/components/RightSidebarGrades';
import locale from 'pages/dashboard/locale/en.json';
import './styles.css';

/**
 * @returns {React.Component} - Component for Subjects Page.
 */
export default function MainView() {
	const [, appActions] = useApplication();
	const formOptions = locale.formOptions;
	return (
		<div className='personal-container'>
			<div className={'section-header'}>
				<div className={'title'}>{'Settings'}</div>
			</div>
			<Container>
				<Button
					key='settings-btn'
					className='settings-btn'
					onClick={() => {
						appActions.onSidebarAddView({
							header: null,
							content: <RightSidebarGrades />,
							onHide: () => {
								appActions.onHideSidebar();
							},
							footer: null,
						});
					}}
				>
					{formOptions.titleMenu}
				</Button>
			</Container>
		</div>
	);
}
