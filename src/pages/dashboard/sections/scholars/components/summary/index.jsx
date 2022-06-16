import React from 'react';
import Card from './components/card';
import LastEvaluation from './components/lastEvaluation';
import Event from './components/event';
import StageScore from './components/stageScore';
import { Grid, GridColumn } from 'semantic-ui-react';

/**
 * @returns {React.Component} - view component for Summary tab.
 */
export default function Summary() {
	return (
		<Grid doubling columns={2} className='stage-summary-container' stretched>
			<GridColumn>
				<Card name={'Last Evaluation Skills'} component={<LastEvaluation />} />
			</GridColumn>
			<GridColumn>
				<Card component={<StageScore />} />
				<Card component={<Event />} />
			</GridColumn>
		</Grid>
	);
}
