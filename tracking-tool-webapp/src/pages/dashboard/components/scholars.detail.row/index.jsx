import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './styles.css';

/**
 * Renders the details of a scholar
 *
 * @param {object} properties Properties of component
 * @returns {React.Component} Table row for scholar details
 */
export default function ScholarsDetailRow(properties) {
	const { numberOfCells, children } = properties;
	return (
		<Table.Row className='detail-row'>
			<Table.Cell colSpan={numberOfCells}>{children}</Table.Cell>
		</Table.Row>
	);
}

ScholarsDetailRow.propTypes = {
	numberOfCells: PropTypes.number,
	children: PropTypes.node,
};

ScholarsDetailRow.defaultProps = {
	numberOfCells: 1,
};
