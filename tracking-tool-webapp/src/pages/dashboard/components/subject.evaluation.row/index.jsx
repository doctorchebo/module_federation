import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Table, Icon, Image } from 'semantic-ui-react';
import { imageProfile } from 'helpers/Dashboard';
import SubjectEvaluationDetail from 'components/subjectEvaluationDetail';
import './index.css';

/**
 * @param {object} props - Component properties
 * @returns {React.Component} - Custom table row with for expandable content
 */
function SubjectEvaluationRow(props) {
	const { item, expanded } = props;
	const [isExpanded, setExpanded] = useState(expanded);

	return (
		<>
			<Table.Row>
				<Table.Cell>
					<Icon
						onClick={() => setExpanded(!isExpanded)}
						name={!isExpanded ? 'angle right' : 'angle down'}
					/>
				</Table.Cell>
				<Table.Cell>
					<Image spaced circular size='mini' src={imageProfile} />
					{item.Scholar}
				</Table.Cell>
				<Table.Cell>{item.AverageGrade}</Table.Cell>
			</Table.Row>
			{isExpanded ? <SubjectEvaluationDetail scholarId={item.id} itemList={item} /> : null}
		</>
	);
}

SubjectEvaluationRow.propTypes = {
	item: PropTypes.object,
	expanded: PropTypes.bool,
};
SubjectEvaluationRow.defaultProps = {
	item: null,
	expanded: true,
};

export default SubjectEvaluationRow;
