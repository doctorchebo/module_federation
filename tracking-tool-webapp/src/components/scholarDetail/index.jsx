import React from 'react';
import PropTypes from 'prop-types';
import { ScholarDetailDataProvider } from './context/context';
import DetailRowView from './views/DetailRowView';

/**
 * @param {object} props - properties for the component to work.
 * @returns {React.Component} - Smart Component for Scholar Detail information.
 */
function ScholarDetail(props) {
	const { scholarId, itemList } = props;

	return (
		<ScholarDetailDataProvider>
			<DetailRowView scholarId={scholarId} itemList={itemList} />
		</ScholarDetailDataProvider>
	);
}

ScholarDetail.propTypes = {
	scholarId: PropTypes.string,
	itemList: PropTypes.array,
};

export default ScholarDetail;
