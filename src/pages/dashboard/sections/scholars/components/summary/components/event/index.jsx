import React, { useEffect } from 'react';
import { Card, Feed, Icon, Grid } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';
import informationCard from './informationCard';

/**
 * @returns {React.Component} -
 */
function Event() {
	const [state, actions] = useScholarDetailContext();
	const { id } = useParams();

	useEffect(() => {
		actions.onCountEvents(id);
	}, []);

	const getTypeEvent = (nameTypeEvent) => {
		return state.eventsSummary.reduce((acc, { name, count }) => {
			return name === nameTypeEvent ? acc + count : acc;
		}, 0);
	};

	const getCardTypeEvent = () => {
		return informationCard.map((item) => {
			return (
				<Grid.Column key={item.title}>
					<Feed>
						<Feed.Event>
							<a>
								<Icon name={item.icon} color='grey' />
							</a>
						</Feed.Event>
					</Feed>
					<Feed.Event>
						<Feed.Content>
							<Feed.Summary>{item.title}</Feed.Summary>
						</Feed.Content>
					</Feed.Event>
					<Feed>
						<Feed.Event>
							<Feed.Content>
								<Feed.Summary>{getTypeEvent(item.function)}</Feed.Summary>
							</Feed.Content>
						</Feed.Event>
					</Feed>
				</Grid.Column>
			);
		});
	};

	return (
		<Card.Content className='event-widget'>
			<Grid columns={3}>{getCardTypeEvent()}</Grid>
		</Card.Content>
	);
}

export default Event;
