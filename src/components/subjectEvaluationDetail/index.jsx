import PropTypes from 'prop-types';
import React from 'react';
import DetailRowView from './views/DetailRowView';
import { SubjectEvaluationDetailDataProvider } from './context/context';

/**
 * @param {object} props - properties for the component to work.
 * @returns {React.Component} - Smart Component for subject evaluation detail.
 */
function SubjectEvaluationDetail(props) {
	const { scholarId, itemList } = props;

	return (
		<SubjectEvaluationDetailDataProvider>
			<DetailRowView scholarId={scholarId} itemList={itemList} />
		</SubjectEvaluationDetailDataProvider>
	);
}

SubjectEvaluationDetail.propTypes = {
	scholarId: PropTypes.string,
	itemList: PropTypes.object,
};

export default SubjectEvaluationDetail;
