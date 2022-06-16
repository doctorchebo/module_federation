import React from 'react';
import PropTypes from 'prop-types';
import { Table, Image, Icon, Segment } from 'semantic-ui-react';
import { imageProfile } from 'helpers/Dashboard';
import './index.css';
import UpdateCandidateForm from 'pages/dashboard/components/update.candidate.form';
import { useApplication } from 'application/context/AppContext';
import locale from 'pages/dashboard/sections/candidates/locale/en.json';
import Button from 'components/button';

/**
 * @param {object} props - Component properties
 * @returns {React.Component} - Custom table row with for expandable content
 */
function CandidateTableRow(props) {
	const { item, actions } = props;
	const [, appActions] = useApplication();

	const handleCandidateEdit = (candidate) => {
		appActions.onSidebarAddView({
			header: null,
			content: (
				<Segment basic padded className='form-container'>
					<UpdateCandidateForm
						className='updata-candidate-form'
						value={candidate}
						title={locale.updateCandidateForm.update.title}
						actions={appActions}
						onSubmit={(value) => {
							let newCandidate = JSON.parse(JSON.stringify(candidate));
							newCandidate.person.fullName = value.fullName;
							newCandidate.person.personalEmail = value.personalEmail;
							newCandidate.person.phoneNumber = value.phoneNumber;
							newCandidate.activity.activityType.description = value.status
								? 'Postulation'
								: 'None';
							actions.onCandidateUpdate(newCandidate);
							appActions.onHideSidebar();
						}}
					/>
				</Segment>
			),
			footer: null,
		});
	};

	return (
		<>
			<Table.Row name='Custom-Row' className='candidate-row'>
				<Table.Cell key='table-cell-1'>
					<Image key='profile' spaced circular size='mini' src={imageProfile} />
				</Table.Cell>
				<Table.Cell key='table-cell-2' name='full-name' className='full-name'>
					{item.person.fullName}
				</Table.Cell>
				<Table.Cell key='table-cell-3' name='email' className='email'>
					{item.person.personalEmail}
				</Table.Cell>
				<Table.Cell key='table-cell-4' name='phoneNumber'>
					{item.person.phoneNumber}
				</Table.Cell>
				<Table.Cell key='table-cell-5'>
					<div key='download-1' className='container-download'>
						<Icon
							key='icon-1'
							size='large'
							className='download-icon'
							name={'file alternate'}
						></Icon>
						<a
							key='path'
							href={item.profile.pathResume}
							className='download'
							target='_blank'
							rel='noreferrer'
						>
							Open File
						</a>
					</div>
				</Table.Cell>
				<Table.Cell key='table-cell-6' name='versionName'>
					{item.programVersionName}
				</Table.Cell>
				<Table.Cell key='table-cell-7' name='status'>
					{item.activity.activityType.description}
				</Table.Cell>
				<Table.Cell key='table-cell-8'>
					<Button
						key='button-1'
						basic
						floated={'right'}
						onClick={() => handleCandidateEdit(item)}
						icon={<Icon name={'edit'} />}
						className='btn-edit'
					/>
				</Table.Cell>
			</Table.Row>
		</>
	);
}

CandidateTableRow.propTypes = {
	item: PropTypes.object,
	actions: PropTypes.object,
};
CandidateTableRow.defaultProps = {
	item: null,
};

export default CandidateTableRow;
