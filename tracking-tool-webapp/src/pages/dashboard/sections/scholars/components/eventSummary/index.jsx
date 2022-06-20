import { useScholarDetailContext } from 'components/scholarDetail/context/context';
import { useEventsStore } from 'store/eventsSlice/useEventStore';
import EventCardListView from 'pages/dashboard/components/eventsManager/views/ListView';
import React, { useEffect } from 'react';
import './styles.css';

const EventSummary = () => {
	const [stateScholar] = useScholarDetailContext();
	const user = stateScholar.data;
	const { state, actions } = useEventsStore();
	useEffect(() => {
		actions.onSelectScholar(user);
		const payload = { scholarId: user.id, pageNumber: state.pagination.currentPage };
		actions.onSearchEvent(payload);
		actions.onGetEventTypes();
	}, []);

	return (
		<div className='scholar-summary'>
			<EventCardListView user={user} displayNewView={true} />
		</div>
	);
};

export default EventSummary;
