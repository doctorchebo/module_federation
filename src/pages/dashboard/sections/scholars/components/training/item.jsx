import React, { useState } from 'react';
import { Table, Header, Icon } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { ScholarDetailDataProvider } from 'components/scholarDetail/context/context';
import StagePerformance from '../stagePerformance';

/**
 * @param {object} props his object contains all the info of the componet
 * @param {object} props.item this object has the information for the summary item
 * @returns {React.Component} -
 */
export default function TrainingItem({ item }) {
	const [stageSummaryIsOpen, setStageSummaryIsOpen] = useState(false);

	/**
	 * handle the logic when clicked on the title
	 */
	function handleOnClickTitleStageSummary() {
		setStageSummaryIsOpen(!stageSummaryIsOpen);
	}

	const GradeStars = (grade) => {
		if (grade <= 5 && grade > 0) {
			return (
				<div className='grade-stars'>
					{[...Array(grade)].map((index) => (
						<Icon key={index} name='star' color='yellow' />
					))}
				</div>
			);
		}
	};

	return (
		<>
			<Table.Row>
				<Table.Cell className='stage-container-pointer'>
					<Icon
						onClick={handleOnClickTitleStageSummary}
						name={`angle ${stageSummaryIsOpen ? 'down' : 'right'}`}
					/>
				</Table.Cell>
				<Table.Cell> {item.version} </Table.Cell>
				<Table.Cell>
					<div className={`stage-container ${item.stage}`}>
						<Icon name='circle' />
						<Header.Content>{item.stage}</Header.Content>
					</div>
				</Table.Cell>
				<Table.Cell>{GradeStars(item.grade)}</Table.Cell>
				<Table.Cell>
					<Icon name='calendar minus outline' size='large' />
					{item.duration}
				</Table.Cell>
			</Table.Row>
			<ScholarDetailDataProvider>
				<StagePerformance params={item.stageData} isOpen={stageSummaryIsOpen} />
			</ScholarDetailDataProvider>
		</>
	);
}

TrainingItem.propTypes = {
	item: PropTypes.object,
};
