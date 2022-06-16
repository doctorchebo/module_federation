import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import './index.css';
/**
 * Header to use on import Sidebar
 *
 * @param {*} props Content strings
 * @returns {*} Header component
 */
function ImportHeader(props) {
	const { title, subTitle } = props;
	return (
		<div className={'sidebar-header'}>
			<Container>
				<div className={'sidebar-header-title'}>{title}</div>
				<div className={'sidebar-header-subTitle'}>{subTitle}</div>
			</Container>
		</div>
	);
}

ImportHeader.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
};

export default ImportHeader;
