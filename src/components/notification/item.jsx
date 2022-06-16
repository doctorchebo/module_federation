import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Noop from 'helpers/Noop';
import { iconByFlag } from 'helpers/iconTypes';
import { formatDateByDiffTime } from 'helpers/dateConverter';
import RichText from 'components/richText/richText.jsx';

/**
 * @param {object} properties - properties
 * @returns {React.Component} - Notification list item component
 */
export default function Item(properties) {
	const { title, description, type, isRead, createdAt, onClick } = properties;

	return (
		<Message
			as='li'
			className='notification-item'
			color={isRead ? null : 'teal'}
			icon={iconByFlag(type)}
			header={title}
			content={
				<div>
					<div className='description'>
						<RichText description={description} />
					</div>
					<span className='date-time'>{formatDateByDiffTime(createdAt)}</span>
				</div>
			}
			onClick={onClick}
		/>
	);
}

Item.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	type: PropTypes.string,
	isShow: PropTypes.bool,
	isRead: PropTypes.bool,
	createdAt: PropTypes.string,
	onClick: PropTypes.func,
};

Item.defaultProps = {
	title: '',
	description: '',
	type: 'event',
	isShow: false,
	isRead: false,
	createdAt: '',
	onClick: Noop,
};
