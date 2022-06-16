import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SubjectsBulkForm from 'pages/dashboard/components/subjects.bulk.form';
import { useSubjectDetailsContext } from 'pages/dashboard/sections/subjects/context/subjectDetailsContext';
import locale from 'pages/dashboard/locale/en.json';

/**
 * View for Bulk evaluation
 *
 * @returns {React.Component} - Page View for Bulk evaluation
 */
export default function BulkEvaluationView() {
	const history = useHistory();
	const [state, actions] = useSubjectDetailsContext();
	const [isScholarSelected, setIsScholarSelected] = useState(false);

	const { id } = useParams();

	const handleRedirect = () => {
		history.goBack();
	};

	return (
		<div>
			<SubjectsBulkForm
				title={locale.subjects.bulkEvaluationForm.title}
				loading={state.loading}
				scholarSelected={isScholarSelected}
				onSelectScholar={setIsScholarSelected}
				onSubmit={async (value) => {
					const payload = {
						scholarsIds: value.scholarsIds,
						subjectEvaluationsResource: {
							subjectId: id,
							gradeId: value.grade,
							comment: value.comment,
							isPublished: false,
						},
					};
					await actions.onPostBulkEvaluation({
						data: payload,
						handleRedirect,
					});
				}}
			/>
		</div>
	);
}
