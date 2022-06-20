import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Icon } from 'semantic-ui-react';
import { ConvertToMonthYear, GetMonthYearDiff } from 'helpers/dateConverter';

/**
 * @param {object} props - properties
 * @returns {React.Component} - Scholar time on program.
 */
function ScholarDuration(props) {
	const { enrollDate, duration, start, now, endDate } = props;
	return (
		<>
			<Header as='h3' name='Title'>
				{duration}
			</Header>
			<Grid columns={3}>
				<Grid.Row verticalAlign='middle'>
					<Grid.Column>
						<Header>
							<span name='Enroll-Date'>{ConvertToMonthYear(enrollDate)}</span>
							<Header.Subheader name='Enroll-Description'>{start}</Header.Subheader>
						</Header>
					</Grid.Column>
					<Grid.Column width={2}>
						<Icon name='chevron right' />
					</Grid.Column>
					<Grid.Column>
						<Header>
							{endDate ? (
								<Header>
									<span name='end-date'>{ConvertToMonthYear(endDate)}</span>
									<Header.Subheader name='end-date-description'>
										{GetMonthYearDiff(enrollDate, endDate)}
									</Header.Subheader>
								</Header>
							) : (
								<span name='today-title'>{now}</span>
							)}
						</Header>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</>
	);
}

ScholarDuration.propTypes = {
	enrollDate: PropTypes.string.isRequired,
	endDate: PropTypes.any,
	duration: PropTypes.string.isRequired,
	start: PropTypes.string.isRequired,
	now: PropTypes.string.isRequired,
};

ScholarDuration.defaultProps = {
	enrollDate: '',
	duration: '',
	start: '',
	now: '',
};

export default ScholarDuration;
