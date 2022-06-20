import { VerticalTimeline } from 'react-vertical-timeline-component';
import TimelineItem from './item';
import { Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import 'react-vertical-timeline-component/style.min.css';
import './styles.css';

/**
 * @param {*} props receives properties.
 * @param {*} props.value receives a value.
 * @param {string} props.layout receives a layout.
 * @param {string} props.className receives a className.
 * @param {string} props.animate receives a boolean.
 * @returns {VerticalTimeline} Timeline Component.
 */
function Timeline(props) {
	const { value, layout, className, animate } = props;

	return (
		<VerticalTimeline
			className={classNames('timeline', className)}
			layout={layout}
			animate={animate}
		>
			{value &&
				value.map(({ data, metadata }, index) => (
					<TimelineItem
						key={metadata.id ?? index}
						value={data}
						className={metadata.className}
						icon={<Icon className='node-icon' name={metadata.icon} size='large' />}
					/>
				))}
		</VerticalTimeline>
	);
}

Timeline.propTypes = {
	value: PropTypes.any,
	layout: PropTypes.string,
	className: PropTypes.string,
	animate: PropTypes.bool,
};

export default Timeline;
