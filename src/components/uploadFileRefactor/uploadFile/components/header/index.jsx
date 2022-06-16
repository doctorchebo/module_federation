import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Segment } from 'semantic-ui-react';

/**
 * Header to use on import Sidebar
 *
 * @param {*} props Content strings
 * @returns {*} Header component
 */
export default function HeaderTitle(props) {
	const { title, subTitle } = props;
	return (
		<div className={'header'}>
			<Container>
				<Segment basic>
					<Header as='h2' className='title'>
						{title}
					</Header>
					<Header as='h4' className='subtitle'>
						{subTitle}
					</Header>
				</Segment>
			</Container>
		</div>
	);
}

HeaderTitle.propTypes = {
	title: PropTypes.string,
	subTitle: PropTypes.string,
};
