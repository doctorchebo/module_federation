import React, { useEffect } from 'react';
import { useScholarDetailContext } from 'components/scholarDetail/context/context';
import { useScholarStore } from 'store/scholarSlice/useScholarStore';
import { useParams } from 'react-router';
import locale from '../../locale/en.json';
import Personal from '../../components/personal';
import EmptyContent from 'assets/img/empty-list.png';
import { Image } from 'semantic-ui-react';

/**
 * @returns {React.Component} - Component for Scholars Page.
 */
export default function PersonalView() {
	const [state, actions] = useScholarDetailContext();
	const { id } = useParams();
	const { onLoadScholar } = useScholarStore();

	const buildProfile = () => {
		const data = state.data;
		const { person } = data;
		return {
			scholarId: data.id,
			fullName: person.fullName,
			personalEmail: person.personalEmail,
			phoneNumber: person.phoneNumber,
			currentCity: person.currentCity,
			university: data.university,
			career: data.career,
			academicDegree: data.academicDegree,
			id: person.ci,
			extension: person.issued,
		};
	};

	useEffect(() => {
		actions.OnGetScholarById(id);
		onLoadScholar(id);
	}, []);

	if (state.loading) {
		return <h1>{locale.page.loading}</h1>;
	}

	if (state.success) {
		return <Personal personalData={buildProfile()} scholarActions={actions} />;
	}

	return (
		<div className={'empty-content'}>
			<Image disabled src={EmptyContent} />
		</div>
	);
}
