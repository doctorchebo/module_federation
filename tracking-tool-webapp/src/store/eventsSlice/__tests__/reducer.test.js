import { loadEventsErrorFailed, loadStatusFailed, setloading } from '../action';
import { EventsActionTypes, StatusActionTypes } from '../types';
import { eventsReducer } from '../reducer';
describe('src/redux/eventSlice/action', () => {
	describe('loadErrorAction', () => {
		it('should return the loadErrorAction action', () => {
			const payload = {
				error: 'error',
				message: 'message',
			};
			const expectedAction = {
				type: EventsActionTypes.Error,
				payload,
			};
			expect(loadEventsErrorFailed(payload)).toEqual(expectedAction);
		});
		it('should return the loadStatusFailed action', () => {
			const payload = {
				error: 'error',
				message: 'message',
			};
			const expectedAction = {
				type: StatusActionTypes.Error,
				payload,
			};
			expect(loadStatusFailed(payload)).toEqual(expectedAction);
		});
		it('should return the setloading action', () => {
			const payload = {
				events: {},
			};
			const expectedAction = {
				type: EventsActionTypes.loadingEvents,
				payload,
			};
			expect(setloading(payload)).toEqual(expectedAction);
		});
	});
});

describe('application/context/state', () => {
	describe('State', () => {
		let state;
		beforeEach(() => {
			state = {
				viewStack: ['test view 1', 'test view 2'],
			};
		});
		test('Should add a view in viewStack state', () => {
			const newState = eventsReducer(state, {
				type: EventsActionTypes.onAddView,
				payload: 'test view 3',
			});
			expect(newState.viewStack).toHaveLength(3);
			expect(newState.viewStack[2]).toBe('test view 3');
		});
		test('Should remove a view of viewStack state', () => {
			expect(state.viewStack).toHaveLength(2);
			const newState = eventsReducer(state, {
				type: EventsActionTypes.onPopView,
			});
			expect(newState.viewStack).toHaveLength(1);
		});
	});
});
