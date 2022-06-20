import React from 'react';
import locale from '../../locale/en.json';
import { PropTypes } from 'prop-types';
import { Button, Icon, Segment } from 'semantic-ui-react';
import { useApplication } from 'application/context/AppContext';
import UpdateScholarForm from 'pages/dashboard/components/update.scholar.form';
import './styles.css';
import { normalizeScholarToUpdate } from 'pages/dashboard/helpers';
import extensions from 'pages/dashboard/sections/scholars/components/personal/extensions.json';

/**
 * @param {object} props This object contain actions to execute
 * @returns {React.Component} - CardProfile
 */
export default function Personal(props) {
	const [, actions] = useApplication();
	const {
		fullName,
		university,
		career,
		academicDegree,
		currentCity,
		id,
		extension,
		personalEmail,
	} = props.personalData;
	const { scholarActions } = props;
	const educationalInfoText = locale.scholar.educationalInfo;
	const contactInfoText = locale.scholar.contactInfo;

	const hanldeScholarEdit = () => {
		actions.onSidebarAddView({
			header: null,
			content: (
				<Segment basic padded className='form-container'>
					<UpdateScholarForm
						value={props.personalData}
						title={locale.updateScholarForm.update.title}
						actions={actions}
						onSubmit={(value) => {
							console.log('updated successfully!');
							scholarActions.onScholarUpdate(normalizeScholarToUpdate(value));
							actions.onHideSidebar();
						}}
					/>
				</Segment>
			),
			footer: null,
		});
	};

	return (
		<div className='container-personal'>
			<header className='container-personal__header'>
				<div className='container-personal__name'>
					<span>{fullName}</span>
				</div>
				<Button
					basic
					icon={<Icon name='edit' size='small' className='icon' />}
					content={locale.updateScholarForm.update.label}
					className='custom-button'
					onClick={hanldeScholarEdit}
				/>
			</header>
			<div className='container-personal__main'>
				<div className='container-personal__first'>
					<div>
						<Icon name='id card' size='small' className='personal-icon' />
						<span>{id + extensions[extension?.toLowerCase()] ?? ''}</span>
					</div>
				</div>
				<div className='container-personal__following'>
					<span className='title'>{educationalInfoText.title}</span>
					<div>
						<Icon name='university' size='small' className='personal-icon' />
						<span>{university}</span>
					</div>
					<div>
						<Icon name='graduation' size='small' className='personal-icon' />
						<span>{career}</span>
					</div>
					<div>
						<Icon name='bookmark' size='small' className='personal-icon' />
						<span>{academicDegree}</span>
					</div>
				</div>
				<div className='container-personal__following'>
					<span className='title'>{contactInfoText.title}</span>
					<div>
						<Icon name='map pin' size='small' className='personal-icon' />
						<span>{currentCity}</span>
					</div>
					<div>
						<Icon name='mail' size='small' className='personal-icon' />
						<span>{personalEmail}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

Personal.propTypes = {
	personalData: PropTypes.object.isRequired,
	scholarActions: PropTypes.object.isRequired,
};
