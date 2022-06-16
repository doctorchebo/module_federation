import { Grid, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useSubjectEvaluationContext } from '../context/context';
import './../index.css';

/**
 * @param {object} props - properties
 * @returns {React.Component} - Scholar Info for expanded table row.
 */
function DetailRowView(props) {
	const { scholarId, itemList } = props;
	const [state, actions] = useSubjectEvaluationContext();

	useEffect(() => {
		actions.onGetScholarById(scholarId);
	}, []);

	return (
		<>
			{state.loading ? (
				''
			) : itemList.grade?.length ? (
				<>
					<Table.Row key={itemList.key} name='Custom-Row' className='topEdge titles'>
						<Table.Cell></Table.Cell>
						<Table.Cell colSpan='1'>
							<Grid>
								<Grid.Row stretched>
									<Grid.Column className='letter' width='8'>
										{'Subject'}
									</Grid.Column>
									<Grid.Column className='letter' width='8'>
										{'Grade'}
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Table.Cell>
						<Table.Cell className='letter'>{'Comment'}</Table.Cell>
					</Table.Row>
					{itemList.grade.map((item) => (
						<>
							<Table.Row key={item.key} name='Custom-Row' className='topEdge titles'>
								<Table.Cell></Table.Cell>
								<Table.Cell colSpan='1'>
									<Grid>
										<Grid.Row stretched>
											<Grid.Column width='8'>{item.subjet}</Grid.Column>
											<Grid.Column width='8'>{item.grade}</Grid.Column>
										</Grid.Row>
									</Grid>
								</Table.Cell>
								<Table.Cell>{item.comment}</Table.Cell>
							</Table.Row>
						</>
					))}
				</>
			) : (
				<Table.Row name='Custom-Row' className='topEdge titles'>
					<Table.Cell></Table.Cell>
					<Table.Cell className='letter'>{'No exist data'}</Table.Cell>
					<Table.Cell></Table.Cell>
				</Table.Row>
			)}
		</>
	);
}

DetailRowView.propTypes = {
	scholarId: PropTypes.string,
	itemList: PropTypes.object,
};

export default DetailRowView;
