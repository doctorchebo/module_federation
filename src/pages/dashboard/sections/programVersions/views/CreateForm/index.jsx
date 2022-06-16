import React, { useEffect } from 'react';
import { useProgramVersionsContext } from '../../context';
import ProgramVersionsForm from 'pages/dashboard/components/program.versions.form';
import { stagesToOptions } from '../../helpers/mappers/stagesToOptions';
import { trainersToOptions } from '../../helpers/mappers/trainersToOptions';

import locale from '../../locale/en.json';
import { useApplication } from 'application/context/AppContext';
import PropTypes from 'prop-types';

/**
 * @param {props} props Properties
 * @returns {React.Component} - Jsx Element for Create ProgramVersion Form.
 */
export default function CreateFormProgramVersion({ item }) {
	const [, appActions] = useApplication();
	const { id, version } = item;
	const [state = {}, actions] = useProgramVersionsContext();
	const formProps = {
		programVersionRename: version,
		stages: stagesToOptions(state.stages),
		trainers: trainersToOptions(state.trainers),
		errorMessages: locale.errorMessages,
		eventForm: locale.eventForm,
		eventFormAction: locale.eventForm.create,
	};

	/**
	 *
	 */
	function handleSubjectChange() {
		actions.onGetTrainers();
	}
	useEffect(() => {
		actions.onGetStages(id);
	}, []);
	return (
		<ProgramVersionsForm
			{...formProps}
			onSubjectChange={handleSubjectChange}
			onCancel={() => {
				appActions.onHideSidebar();
			}}
			onSubmit={(value) => {
				const payload = {
					id: item.id,
					programVersionRename: value.renameVersion,
					stage: {
						id: value.stageId,
						stageRename: value.renameStage,
						stageApprovalRequired: value.currentStageApproval,
						startDate: value.startDate.toISOString(),
						endDate: value.endDate.toISOString(),
					},
					subject: {
						id: value.subjectId,
						subjectRename: value.renameSubject,
						trainer: value.trainerId,
					},
				};
				actions.OnPutProgramVersion(payload);
				appActions.onHideSidebar();
				actions.onLoadProgramVersions(item.id);
			}}
		/>
	);
}

CreateFormProgramVersion.propTypes = {
	item: PropTypes.object,
};
