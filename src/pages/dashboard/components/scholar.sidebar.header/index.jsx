import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './styles.css';

/**
 * @param {object} props all values of event
 * @returns {React.Component} sidebar list events container
 */
function ScholarSideBarHeader(props) {
	const { user, title } = props;
	return (
		<div className='sidebar-event-header'>
			<Segment basic>
				<Header as='h2'>{user}</Header>
				<Header as='h2'>{title}</Header>
			</Segment>
		</div>
	);
}

ScholarSideBarHeader.propTypes = {
	user: PropTypes.string,
	title: PropTypes.string,
	events: PropTypes.array,
};

export default ScholarSideBarHeader;
