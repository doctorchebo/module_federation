import React, { useEffect, useState } from 'react';
import produce from 'immer';
import PropTypes from 'prop-types';
import { Pagination, Icon } from 'semantic-ui-react';
import Noop from 'helpers/Noop';
import './index.css';

/**
 * @param {object} props .
 * @returns {React.Component} .
 */
function PaginationComponent(props) {
	const { currentPage, pageSize, totalResults, totalPages, onPageChanged } = props;
	const initState = {
		end: 0,
		init: 0,
	};
	const [state, setState] = useState(initState);

	const initResults = (currentPage - 1) * pageSize + 1;
	const endResults = currentPage === totalPages ? totalResults : currentPage * pageSize;

	const isFirst = initResults === 1;
	const isLast = currentPage === totalPages;

	useEffect(() => {
		const newState = produce(state, (draft) => {
			draft.init = initResults;
			draft.end = endResults;
		});
		setState(newState);
	}, [currentPage, pageSize, totalResults, totalPages]);

	const handlePageChange = (e, { activePage }) => {
		onPageChanged(activePage);
	};

	return (
		<div className='pagination'>
			<span className='message'>
				{`Showing ${state.init} to ${state.end} of ${totalResults} entries`}
			</span>
			<span className='spacing' />
			<Pagination
				ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
				firstItem={{
					content: <Icon name='angle double left' />,
					icon: true,
					disabled: isFirst,
				}}
				lastItem={{
					content: <Icon name='angle double right' />,
					icon: true,
					disabled: isLast,
				}}
				prevItem={{
					content: <Icon name='angle left' />,
					icon: true,
					disabled: isFirst,
				}}
				nextItem={{
					content: <Icon name='angle right' />,
					icon: true,
					disabled: isLast,
				}}
				activePage={currentPage < totalPages ? currentPage : totalPages}
				onPageChange={handlePageChange}
				size='tiny'
				totalPages={totalPages}
			/>
		</div>
	);
}

PaginationComponent.propTypes = {
	currentPage: PropTypes.number,
	pageSize: PropTypes.number,
	totalResults: PropTypes.number,
	totalPages: PropTypes.number,
	onPageChanged: PropTypes.func,
};

PaginationComponent.defaultProps = {
	currentPage: 1,
	onPageChanged: Noop,
	pageSize: 8,
	totalResults: 24,
	totalPages: 3,
};

export default PaginationComponent;
