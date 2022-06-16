import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
/**
 * @param {Array} props all headers
 * @returns {React.Component} table header component
 */
function CustomTableHeader(props) {
	const { headers, requestSort, getClassNamesForSort, backendSort, type } = props;
	return (
		<Table.Header>
			<Table.Row>
				{headers.map((header, index) => (
					<Table.HeaderCell
						textAlign='left'
						key={index}
						name={header}
						onClick={() => requestSort(header, backendSort, type)}
						className={getClassNamesForSort(header)}
					>
						{header}
					</Table.HeaderCell>
				))}
			</Table.Row>
		</Table.Header>
	);
}

CustomTableHeader.propTypes = {
	headers: PropTypes.array,
	requestSort: PropTypes.func,
	getClassNamesForSort: PropTypes.func,
	backendSort: PropTypes.bool,
	type: PropTypes.string,
};

CustomTableHeader.defaultProps = {
	getClassNamesForSort: () => {},
};

export default CustomTableHeader;
