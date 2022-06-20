import React from 'react';
import { Sidebar } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './index.css';

/**
 * Sidebar personalized to use in right side
 *
 * @param {*} props Receives all SemanticUI properties
 * @returns {*} A Sidebar container component
 */
function RightSidebar(props) {
	const { className } = props;
	return (
		<Sidebar
			{...props}
			direction={'right'}
			className={`${className ? className : ''} right-sidebar `}
		/>
	);
}

RightSidebar.propTypes = {
	className: PropTypes.string,
};

export default RightSidebar;
