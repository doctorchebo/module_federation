import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useScholarDetailContext } from '../context/context';
import { Grid, Header, Segment } from 'semantic-ui-react';
import PersonInfo from '../components/personInfo';
import ScholarDuration from '../components/scholarDuration';
import locale from '../locale/en.json';
import ProgramInfo from '../components/programInfo';
import CustomPlaceHolder from '../components/customPlaceHolder';
import { useScholarStore } from 'store/scholarSlice/useScholarStore';
import ActionsMenu from 'components/actionsMenu';

/**
 * @param {object} props - properties
 * @returns {React.Component} - Scholar Info for expanded table row.
 */
function DetailRowView(props) {
	const { scholarId, itemList } = props;
	const [state, actions] = useScholarDetailContext();
	const { onLoadScholar } = useScholarStore();

	useEffect(() => {
		actions.OnGetScholarById(scholarId);
		onLoadScholar(scholarId);
	}, []);

	return (
		<>
			{state.loading ? (
				<CustomPlaceHolder />
			) : state.success ? (
				<Grid columns={4} stackable className='scholar-grid'>
					<Grid.Row stretched>
						<Grid.Column className='scholar-name-column'>
							<PersonInfo
								fullName={state.data.person.fullName}
								currentCity={state.data.person.phoneNumber}
								phoneNumber={state.data.person.currentCity}
							/>
						</Grid.Column>
						<Grid.Column className='scholar-programs-column'>
							<Grid.Row>
								<ProgramInfo
									title={locale.programs}
									programVersionName={state.data.programVersionName || undefined}
								/>
							</Grid.Row>
							<Grid.Row className='scholar-grid-duration'>
								{state.data.programVersionName ? (
									<ScholarDuration
										enrollDate={state.data.enrollDate}
										endDate={state.data.endDate}
										duration={locale.duration}
										start={locale.start}
										now={locale.now}
									/>
								) : (
									<Header as='h2'>{locale.emptyProgramDuration}</Header>
								)}
							</Grid.Row>
						</Grid.Column>
						<Grid.Column
							width='2'
							verticalAlign='middle'
							className='scholar-name-column scholar-event-column'
						>
							<ActionsMenu expanded itemList={itemList}></ActionsMenu>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			) : (
				<Segment basic textAlign='center'>
					<Header as='h3'>
						{locale.errorTitle}
						<Header.Subheader>{locale.errorMessage}</Header.Subheader>
					</Header>
				</Segment>
			)}
		</>
	);
}

DetailRowView.propTypes = {
	scholarId: PropTypes.string,
	itemList: PropTypes.array,
};

export default DetailRowView;
