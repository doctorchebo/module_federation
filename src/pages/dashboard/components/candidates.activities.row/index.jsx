import React from 'react';
import PropTypes from 'prop-types';
import { Table, Image } from 'semantic-ui-react';
import { imageProfile } from 'helpers/Dashboard';

/**
 * @param {object} props - Component properties
 * @returns {React.Component} - Custom table row with for expandable content
 */
function CandidatesActivitiesTableRow(props) {
	const { item } = props;

	return (
		<>
			<Table.Row name='Custom-Row' className='candidate-row'>
				<Table.Cell key='table-cell-1' with='2'>
					<Image key='profile' spaced circular size='mini' src={imageProfile} />
				</Table.Cell>
				<Table.Cell key='table-cell-2' name='full-name' className='full-name'>
					{item.person.fullName}
				</Table.Cell>
				<Table.Cell key='table-cell-3' name='activity' with='6'>
					{item.activity.activityType.description}
				</Table.Cell>
			</Table.Row>
		</>
	);
}

CandidatesActivitiesTableRow.propTypes = {
	item: PropTypes.object,
};
CandidatesActivitiesTableRow.defaultProps = {
	item: null,
};

export default CandidatesActivitiesTableRow;
