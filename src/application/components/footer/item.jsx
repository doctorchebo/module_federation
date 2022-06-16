import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, List, Icon } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

/**
 * @param {*} props -
 * @returns {React.Component} -
 */
export default function Item(props) {
	const { headerContent, bodyContent, socialIcons } = props;
	const listItems = bodyContent.map((content, key) => (
		<List.Item as='a' key={key}>
			{!isNaN(content) ? <Icon name='phone' size='small' /> : ''}
			{content}
		</List.Item>
	));
	const listSocialIcons = socialIcons.map((icon, key) => (
		<Icon name={icon} key={key} size='big' />
	));
	return (
		<Grid.Column width={5}>
			<Header
				inverted
				as='h3'
				content={
					<FormattedMessage
						id='app.footer.headerContent'
						values={{ content: headerContent }}
					/>
				}
			/>
			<List link inverted>
				{listItems}
			</List>
			{listSocialIcons}
		</Grid.Column>
	);
}

Item.propTypes = {
	headerContent: PropTypes.string,
	bodyContent: PropTypes.array,
	socialIcons: PropTypes.array,
};

Item.defaultProps = {
	socialIcons: [],
	bodyContent: [],
};
