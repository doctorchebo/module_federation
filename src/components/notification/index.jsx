import React from 'react';
import './index.css';
import { Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Noop from 'helpers/Noop';
import SockJsClient from 'react-stomp';
import { getWebSocketValues } from 'api/websocket';
import { isEmpty } from 'helpers/validators';

/**
 * @param {object} properties - properties
 * @returns {React.Component} - Notification Component
 */
export default function Notification(properties) {
	const { value, icon, onDisplay, onUpdate } = properties;
	const { list = [], viewed = true } = value;
	const unread = list.filter((item) => !item.isRead).length;
	const { url, topic } = getWebSocketValues();

	return (
		<>
			<div className='notification' onClick={onDisplay}>
				<Icon name={icon} />
				{!viewed && !isEmpty(list) && (
					<Label as='span' size='tiny' floating circular>
						{unread > 9 ? '9+' : unread}
					</Label>
				)}
			</div>
			<SockJsClient url={url} topics={[topic]} onMessage={(message) => onUpdate(message)} />
		</>
	);
}

Notification.propTypes = {
	value: PropTypes.object,
	icon: PropTypes.string,
	onShow: PropTypes.func,
};

Notification.defaultProps = {
	value: { viewed: true, list: [] },
	icon: 'bell outline',
	onShow: Noop,
};
