import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import 'react-vertical-timeline-component/style.min.css';

/**
 * @param {*} props receive properties.
 * @param {*} props.value receives a value.
 * @param {string} props.className receives a className.
 * @param {Element} props.icon receives an icon.
 * @returns {VerticalTimelineElement} Timeline item.
 */
function TimelineItem(props) {
	const { value, className, icon } = props;
	const { header, subHeader, description, date } = value;
	return (
		<VerticalTimelineElement
			className={classNames('timeline-item', className)}
			icon={icon}
			date={date}
		>
			<header className='header'>{header}</header>
			<sub className='sub-header'>{subHeader}</sub>
			<p className='description'>{description}</p>
		</VerticalTimelineElement>
	);
}

TimelineItem.propTypes = {
	value: PropTypes.any,
	title: PropTypes.string,
	subtitle: PropTypes.string,
	description: PropTypes.string,
	date: PropTypes.string,
	icon: PropTypes.element,
	className: PropTypes.string,
};

export default TimelineItem;
