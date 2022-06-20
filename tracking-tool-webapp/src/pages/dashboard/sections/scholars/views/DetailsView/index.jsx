import React, { useEffect } from 'react';
import Details from '../../components/details';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';
import { useScholarStore } from 'store/scholarSlice/useScholarStore';
import { useParams } from 'react-router';
import locale from '../../locale/en.json';
import { statusClassName, statusName } from '../../helpers/mapScholarsToTable';
import BreadCrumbsList from 'pages/dashboard/components/breadCrumbs/breadCrumbs.json';
import { useBreadcrumbsContext } from 'pages/dashboard/components/breadCrumbs/context/breadcrumbsContext';

/**
 * @returns {React.Component} - Component for Scholars Page.
 */
function DetailsView() {
	const [state, actions] = useScholarDetailContext();
	const { onLoadScholar } = useScholarStore();

	const { id } = useParams();

	const buildProfile = () => {
		const data = state.data;
		const { programVersionName, person } = data;
		return {
			fullName: person.fullName,
			email: data.institutionalEmail,
			phone: person.phoneNumber,
			personalEmail: person.personalEmail,
			currentCity: person.currentCity,
			university: data.university,
			career: data.career,
			academicDegree: data.academicDegree,
			version: programVersionName,
			status: statusName(data.statusTypeId),
			statusClass: statusClassName(data.statusTypeId),
			enrollDate: data.enrollDate,
			endDate: data.endDate,
		};
	};

	const [, breadcrumbsActions] = useBreadcrumbsContext();
	useEffect(() => {
		breadcrumbsActions.onBreadcrumbsLoad(BreadCrumbsList.scholarDetail);
	}, []);

	useEffect(() => {
		actions.OnGetScholarById(id);
		onLoadScholar(id);
	}, []);

	if (state.loading) {
		return <h1>{locale.page.loading}</h1>;
	}

	if (state.success) {
		return (
			<>
				<Details profileData={buildProfile()} />
			</>
		);
	}
	return <h1>{locale.page.error}</h1>;
}
export default DetailsView;
