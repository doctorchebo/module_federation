import React from 'react';
import Item from './item';
import { Container, Grid, Segment } from 'semantic-ui-react';
import locale from '../../locale/en.json';
import './index.css';

/**
 * @returns {React.Component} -
 */
export default function Footer() {
	const { footer } = locale;
	const items = footer.map((content, key) => (
		<Item
			key={key}
			headerContent={content.headerContent}
			bodyContent={content.bodyContent}
			socialIcons={content.socialIcons}
		/>
	));
	return (
		<Segment inverted vertical>
			<Container>
				<Grid divided inverted stackable>
					<Grid.Row textAlign='center'>{items}</Grid.Row>
				</Grid>
			</Container>
		</Segment>
	);
}
