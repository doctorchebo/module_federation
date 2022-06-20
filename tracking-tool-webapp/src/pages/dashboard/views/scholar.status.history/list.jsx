import React, { useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useStatusContext } from './context';
import Timeline from 'components/timeline';
import { useApplication } from 'application/context/AppContext';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';
import { useScholarStore } from 'store/scholarSlice/useScholarStore';
import EmptyContent from 'assets/img/empty-list.png';

const ScholarStatus = {
	Active: 1,
	Complete: 2,
	Inactive: 3,
	onHold: 4,
};

/**
 * Get name for a status type id
 *
 * @param {number} statusCode A number with id of a status type
 * @returns {string} Return the name for a status type
 */
function statusName(statusCode) {
	switch (statusCode) {
		case ScholarStatus.Active:
			return 'Active';
		case ScholarStatus.Complete:
			return 'Completed';
		case ScholarStatus.Inactive:
			return 'Inactive';
		case ScholarStatus.onHold:
			return 'Onhold';
		default:
			return 'Active';
	}
}

/**
 * Get name of an icon for a status type
 *
 * @param {number} statusCode A number with id of a status type
 * @returns {string} Return the name of an icon for a status type
 */
function toStatusIcon(statusCode) {
	switch (statusCode) {
		case ScholarStatus.Active:
			return 'chevron right';
		case ScholarStatus.Complete:
			return 'check';
		case ScholarStatus.Inactive:
			return 'dont';
		case ScholarStatus.onHold:
			return 'clock outline';
		default:
			return 'chevron right';
	}
}

/**
 * @param {object} props - component properties
 * @param {object} props.user - user object
 * @param {object} props.event - event object
 * @returns {React.Component} - view component for list of cards.
 */
function ScholarStatusTimeline(props) {
	const [state, actions] = useStatusContext();
	const [applicationState] = useApplication();
	const [, scholarActions] = useScholarDetailContext();
	const { user } = props;
	const { onLoadScholar } = useScholarStore();

	useEffect(() => {
		if (applicationState.sidebarHistory.length === 0) {
			actions.onStatusHistoryGet(user.id);
			onLoadScholar(user.id);
		}
	}, [applicationState.sidebarHistory]);

	useEffect(() => {
		if (!state.loadingStatusHistory) {
			scholarActions.OnGetScholarById(user.id);
		}
	}, [state.loadingStatusHistory]);

	const statusHistory = {
		layout: '1-column-left',
		className: 'status-timeline',
		animate: false,
		value: state.scholarStatusHistory.map((item) => {
			return {
				metadata: {
					id: item.id,
					className: statusName(item.currentStatus).toLowerCase(),
					icon: toStatusIcon(item.currentStatus),
				},
				data: {
					header: statusName(item.currentStatus),
					subheader: item.programVersion.name + ', ' + item.stage.name,
					description: item.description,
					date: dayjs(item.createAt).format('ddd, MMM D, YYYY h:mm A'),
				},
			};
		}),
	};

	return (
		<>
			{state.loadingStatusHistory ? (
				<div className='ui active centered inline loader' />
			) : (
				<>
					{state.scholarStatusHistory.length > 0 ? (
						<Timeline {...statusHistory} />
					) : (
						<div className='personal-container'>
							<div className='empty-content'>
								<Image disabled src={EmptyContent} />
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
}

ScholarStatusTimeline.propTypes = {
	user: PropTypes.object,
	userid: PropTypes.string,
};

export default ScholarStatusTimeline;
