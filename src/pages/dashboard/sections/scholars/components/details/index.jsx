import React from 'react';
import { Icon, Image, Popup } from 'semantic-ui-react';
import ClassNames from 'classnames';
import locale from '../../locale/en.json';
import { PropTypes } from 'prop-types';
import './styles.css';
import { ConvertToMonthYear, GetMonthYearDiff } from 'helpers/dateConverter';
import ProfileTabs from '../profileTabs';
import Summary from '../summary';
import Training from '../training';
import States from '../states';
import EventSummary from '../eventSummary';
import PersonalView from '../../views/PersonalView';

/**
 * @param {object} props This object contain actions to execute
 * @returns {React.Component} - CardProfile
 */
export default function Details(props) {
	const {
		fullName,
		version,
		email,
		phone,
		currentCity,
		status,
		statusClass,
		enrollDate,
		endDate,
	} = props.profileData;
	const image = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';
	// todo: URL should be replaced by the profile picture later
	const tabs = [
		<Summary key={'Summary'} />,
		<Training key={'Training'} />,
		<States key={'States'} />,
		<PersonalView key={'Personal'} />,
		<EventSummary key={'EventSummary'} />,
	];

	const getDateDifference = () =>
		endDate
			? `${ConvertToMonthYear(endDate)} (${GetMonthYearDiff(enrollDate, endDate)})`
			: 'Until now';

	return (
		<>
			<div className='container-details'>
				<p className='container-details__title'>{locale.scholar.title}</p>
				<div className='container-details--main'>
					<Image floated='left' src={image} className='container-details__img' circular />
					<div className='container-details__left-information'>
						<div className='container-information'>
							<div className='container-information__name'>
								<strong>{fullName}</strong>
							</div>
							<Popup
								trigger={
									<div className='container-information__version'>{version}</div>
								}
								content='Current Program'
								size='mini'
								position='top center'
							/>
						</div>
						<div name='status' className={ClassNames('status', statusClass)}>
							<Popup
								trigger={<div className={ClassNames(status)} />}
								content='Status'
								size='mini'
								position='top center'
							/>
							{status}
						</div>
						<div className='container-attribute'>
							<Popup
								trigger={
									<Icon name='clock' className='container-attribute__icon' />
								}
								content='Duration'
								size='mini'
								position='top center'
							/>

							<span
								className='container-information__attribute'
								name='scholar-duration'
							>
								{`${ConvertToMonthYear(enrollDate)} > ${getDateDifference()}`}
							</span>
						</div>
						<div className='container-attribute'>
							<Popup
								trigger={
									<Icon
										name='phone volume'
										className='container-attribute__icon'
									/>
								}
								content='Phone'
								size='mini'
								position='top center'
							/>
							<span className='container-information__attribute'>{phone}</span>
						</div>
						<div className='container-attribute'>
							<Popup
								trigger={<Icon name='mail' className='container-attribute__icon' />}
								content='Email'
								size='mini'
								position='top center'
							/>
							<span className='container-information__attribute'>{email}</span>
						</div>
						<div className='container-attribute'>
							<Popup
								trigger={
									<Icon
										name='map marker alternate'
										className='container-attribute__icon'
									/>
								}
								content='City'
								size='mini'
								position='top center'
							/>
							<span className='container-information__attribute'>{currentCity}</span>
						</div>
					</div>
				</div>
			</div>
			<ProfileTabs items={tabs} />
		</>
	);
}

Details.propTypes = {
	profileData: PropTypes.object.isRequired,
};
