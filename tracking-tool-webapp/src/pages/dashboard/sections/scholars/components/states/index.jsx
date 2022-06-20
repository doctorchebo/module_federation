import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useApplication } from '../../../../../../application/context/AppContext';
import { StatusDataProvider } from 'pages/dashboard/views/scholar.status.history/context';
import ScholarStatusTimeline from 'pages/dashboard/views/scholar.status.history/list';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';
import RightSidebarStatus from 'pages/dashboard/components/RightSidebarStatus';
import locale from '../../locale/en.json';
import './styles.css';
/**
 * @returns {React.Component} - smart component for event management
 */
export default function States() {
	const [state] = useScholarDetailContext();
	const [, appActions] = useApplication();
	const user = state.data;
	const scholar = {
		id: state?.data.id,
		User: state?.data.person.fullName,
	};

	const handleChangeStatus = () => {
		appActions.onSidebarAddView({
			header: null,
			content: <RightSidebarStatus user={scholar} />,
			footer: null,
		});
	};

	return (
		<>
			<div className='status__container'>
				<span className='status__title'>{locale.statusHistory}</span>
				<Button
					basic
					icon={<Icon name='edit' size='small' className='icon' />}
					content={locale.updateScholarForm.update.label}
					className='custom-button'
					onClick={handleChangeStatus}
				/>
			</div>
			<StatusDataProvider>
				<ScholarStatusTimeline user={user} />
			</StatusDataProvider>
		</>
	);
}

States.propTypes = {
	path: PropTypes.string,
};
