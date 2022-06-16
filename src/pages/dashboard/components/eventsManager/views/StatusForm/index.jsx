import React, { useEffect } from 'react';
import { useEventsStore } from 'store/eventsSlice/useEventStore';
import StatusFormComponent from 'pages/dashboard/components/eventsManager/components/statusForm';
import { statusTypesToOptions } from '../../helpers/normalize';
import locale from '../../locale/en.json';
import { useApplication } from 'application/context/AppContext';

/**
 * @returns {React.Component} - Jsx Element for Create Change Status Form.
 */
function UpdateStatusForm() {
	const { state, actions } = useEventsStore();
	const [, appActions] = useApplication();

	const formProps = {
		statusTypes: statusTypesToOptions(state.status),
		errorMessages: locale.statusErrorMessages,
		statusForm: locale.statusForm,
		statusFormAction: locale.statusForm.update,
		scholar: state.selectedScholar,
	};

	useEffect(() => {
		actions.onGetStatus();
	}, []);

	return (
		<StatusFormComponent
			{...formProps}
			onCancel={() => {
				appActions.onHideSidebar();
			}}
			onSubmit={(value) => {
				const payload = {
					scholarId: state.selectedScholar.id,
					...value,
				};
				actions.onUpdateChangeStatus(payload);
				appActions.onHideSidebar();
			}}
		/>
	);
}

export default UpdateStatusForm;
