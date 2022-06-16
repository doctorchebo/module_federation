import React, { useEffect } from 'react';
import './index.css';
import { Icon, Menu, Segment } from 'semantic-ui-react';
import Locale from './locale/en.json';
import { PropTypes } from 'prop-types';
import UserDetails from '../userDetails/index';
import Notification from 'components/notification';
import List from 'components/notification/list';
import Header from 'components/header';
import { showInformationToast } from 'helpers/toast';
import { iconByFlag } from 'helpers/iconTypes';
import BreadCrumbs from '../../components/breadCrumbs/index';

/**
 * @param {*} props -
 * @returns {React.Component} -
 */
export default function TopMenu(props) {
	const { session, actions } = props;
	useEffect(() => {
		actions.onNotificationsLoad();
	}, []);

	const handleOnShowNotifications = () => {
		actions.onSidebarAddView({
			header: null,
			content: (
				<Segment basic padded className='notifications'>
					<Header as='h3'>
						{Locale.title}
						<Header.Subheader>{Locale.subTitle}</Header.Subheader>
					</Header>
					<List value={session.notifications.list} />
				</Segment>
			),
			footer: null,
		});
		actions.onNotificationsUpdate({ list: session.notifications.list, viewed: true });
	};

	const handleReceivedNotification = (notification) => {
		actions.onNotificationsUpdate({
			list: [notification, ...session.notifications.list],
			viewed: false,
		});
		showInformationToast({
			title: notification.title,
			description: notification.description,
			icon: iconByFlag(notification.type),
		});
	};

	return (
		<Menu borderless className='top-menu'>
			<Menu.Menu position='left'>
				<BreadCrumbs />
			</Menu.Menu>
			<Menu.Menu position='right'>
				<Menu.Item as='a' position='right'>
					<Notification
						value={session.notifications}
						onDisplay={handleOnShowNotifications}
						onUpdate={handleReceivedNotification}
					/>
				</Menu.Item>
				<Menu.Item as='a' position='right'>
					<a href='/userGuide/index.htm' target={'_blank'} className='user-guide'>
						<Icon name='question circle outline' />
					</a>
				</Menu.Item>
				<Menu.Item position='right'>
					<UserDetails
						profile={session.profile}
						role={session.role}
						onLogout={actions.onLogout}
					/>
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
}

TopMenu.propTypes = {
	session: PropTypes.any,
	actions: PropTypes.any,
};
