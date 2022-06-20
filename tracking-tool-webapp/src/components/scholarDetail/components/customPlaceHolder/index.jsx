import React from 'react';
import { Grid, Placeholder } from 'semantic-ui-react';

/**
 *@returns {React.Component} - shows a loading place holder.
 */
function CustomPlaceHolder() {
	return (
		<Grid columns={3} stackable>
			<Grid.Row>
				<Grid.Column>
					<Placeholder>
						<Placeholder.Header image>
							<Placeholder.Line length='medium' />
							<Placeholder.Line length='long' />
							<Placeholder.Line length='medium' />
						</Placeholder.Header>
						<Placeholder.Paragraph>
							<Placeholder.Line length='medium' />
						</Placeholder.Paragraph>
					</Placeholder>
				</Grid.Column>
				<Grid.Column>
					<Placeholder>
						<Placeholder.Header>
							<Placeholder.Line length='medium' />
							<Placeholder.Line length='long' />
						</Placeholder.Header>
						<Placeholder.Paragraph>
							<Placeholder.Line length='medium' />
							<Placeholder.Line length='long' />
							<Placeholder.Line length='medium' />
						</Placeholder.Paragraph>
					</Placeholder>
				</Grid.Column>
				<Grid.Column>
					<Placeholder>
						<Placeholder.Header>
							<Placeholder.Line length='medium' />
							<Placeholder.Line length='medium' />
						</Placeholder.Header>
						<Placeholder.Paragraph>
							<Placeholder.Line length='medium' />
						</Placeholder.Paragraph>
					</Placeholder>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
}

export default CustomPlaceHolder;
