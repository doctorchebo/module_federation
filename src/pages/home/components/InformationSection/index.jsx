import React from 'react';
import { Grid, Segment, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Information from '../Information';
import './styles.css';
/**
 *
 * @param {object} props -
 * @returns {React.Component} -
 */
export default function InformationSection(props) {
	const { value, isReversed } = props;
	const { image, content } = value;

	const information = content.map((info) => {
		const { id, ...other } = info;
		return <Information key={id} value={{ ...other }} />;
	});

	return (
		<Segment className='information-section' vertical>
			<Grid container stackable verticalAlign='middle'>
				<Grid.Row>
					{!isReversed && (
						<Grid.Column className='circle' floated='left' width={7}>
							<Image bordered size={image.size} src={image.value} />
						</Grid.Column>
					)}
					<Grid.Column width={8}>{information}</Grid.Column>
					{isReversed && (
						<Grid.Column className='circle' floated='right' width={7}>
							<Image bordered size={image.size} src={image.value} />
						</Grid.Column>
					)}
				</Grid.Row>
			</Grid>
		</Segment>
	);
}

InformationSection.propTypes = {
	value: PropTypes.object,
	isReversed: PropTypes.bool,
};
