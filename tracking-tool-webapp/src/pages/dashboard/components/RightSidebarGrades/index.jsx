import React, { useEffect } from 'react';
import GradeForm from 'pages/dashboard/components/gradeForm';
import ScholarSideBarHeader from '../scholar.sidebar.header';
import { useSettingsStore } from 'store/settingsSlice/useSettingsStore';
import { useApplication } from 'application/context/AppContext';
import locale from 'pages/dashboard/locale/en.json';

/**
 * Renders the content of RightSidebar when works with eveluation
 *
 * @returns {React.Component} - RightSidebarEvaluate content
 */
export default function RightSidebarGrades() {
	const [, appActions] = useApplication();
	const { settings, onLoadGrades, onUpdateGrades } = useSettingsStore();
	const headers = locale.headerGrades;
	const formOptions = locale.formOptions;
	const gradesFormat = (infoGrades) => {
		return Object.entries(infoGrades).map(([id, value]) => ({ id, color: value }));
	};
	const saveGrades = (infoGrades) => {
		onUpdateGrades(gradesFormat(infoGrades));
		appActions.onHideSidebar();
	};
	useEffect(() => {
		onLoadGrades();
	}, []);

	return (
		<>
			<ScholarSideBarHeader title={formOptions.title}></ScholarSideBarHeader>
			{!settings.loading && (
				<div className='container-form-grade'>
					<GradeForm
						gradeTypes={settings.allGrades}
						formOptions={formOptions}
						onSubmit={saveGrades}
						headers={headers}
						onCancel={() => {
							appActions.onHideSidebar();
						}}
					/>
				</div>
			)}
		</>
	);
}
