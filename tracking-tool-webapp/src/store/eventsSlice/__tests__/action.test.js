import apiEvents from 'api/models/events';
import apiEventType from 'api/models/eventType';
import apiChangeStatus from 'api/models/changeStatus';
import programVersionsAPI from 'api/models/programVersions';
import apiUsers from 'api/models/users';
import apiStatus from 'api/models/status';
import apiScholar from 'api/models/scholars';
import attachmentsApi from 'api/models/attachments';
import notificationsAPI from 'api/models/notifications';
import { eventsReducer } from '../reducer';
import {
	onGetEvents,
	onSearchEvent,
	onPutEvent,
	onPostEvent,
	onUpdateChangeStatus,
	onGetEventTypes,
	onGetSubjects,
	onGetAuthors,
	onGetStatus,
	onGetStages,
	onGetCurrentStage,
	onGetAttachments,
	onDeleteAttachment,
	onGetUsersToNotify,
	onSendNotifications,
	onSendEmails,
} from '../action';

describe('src/redux/scholarSlice/action', () => {
	describe('api responses', () => {
		it('should return data from onGetEvents', async () => {
			const mockPayload = 'guid-id';

			const mockResponse = {
				data: [
					{
						user: 'Osmar Ugarte',
						stage: 'Backend',
						title: 'Has exceed expectations',
						modifiedAt: 'May 16, 2020',
						type: 'Informational',
						description: 'description test',
					},
				],
			};
			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiEvents.getAllWithParams = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onGetEvents(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onSearchEvent', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				data: {
					id: 1,
				},
			};
			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiEvents.getAllWithParams = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onSearchEvent(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onPutEvent', async () => {
			const mockPayload = {
				data: { scholarId: 'guid-id' },
				user: 'Osmar Ugarte',
				stage: 'Backend',
				title: 'Has exceed expectations',
				modifiedAt: 'May 16, 2020',
				type: 'Informational',
				description: 'description test',
			};

			const mockResponse = {
				data: { scholarId: 'guid-id' },
				user: 'Osmar Ugarte',
				stage: 'Backend',
				title: 'Has exceed expectations',
				modifiedAt: 'May 16, 2020',
				type: 'Informational',
				description: 'description test',
			};
			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiEvents.put = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onPutEvent(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onPostEvent', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				data: { scholarId: 'guid-id' },
				userId: 'guid-user',
				stageId: 'guid-stage',
				title: 'Has exceed expectations',
				modifiedAt: 'May 16, 2020',
				type: 'Informational',
				description: 'description test',
			};
			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiEvents.post = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onPostEvent(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onUpdateChangeStatus', async () => {
			const mockPayload = {
				data: { scholarId: 'guid-id' },
				userId: 'guid-user',
				scholarId: 'guid-id',
				status: 'Active',
				description: 'description test',
			};

			const mockResponse = {
				data: { scholarId: 'guid-id' },
				userId: 'guid-user',
				scholarId: 'guid-id',
				status: 'Active',
				description: 'description test',
			};
			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiChangeStatus.post = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onUpdateChangeStatus(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onGetEventTypes', async () => {
			const mockPayload = 'guid-Id';

			const mockResponse = {
				data: [
					{
						id: 'guid-Id',
						name: 'informational',
					},
					{
						id: 'guid-Id-2',
						name: 'concern',
					},
				],
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiEventType.getAll = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onGetEventTypes(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onGetAuthors', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				data: {
					id: 1,
				},
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiUsers.getAll = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onGetAuthors(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onGetSubjects', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				data: {
					id: 1,
				},
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiUsers.getAll = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onGetSubjects(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onGetStatus', async () => {
			const mockPayload = {
				id: '16d3d984-672d-4e31-90e1-4206375a4b9b',
			};

			const mockResponse = {
				data: [
					{
						id: '16d3d984-672d-4e31-90e1-4206375a4b9b',
						name: 'On hold',
					},
					{
						id: '26d3d985-672d-4e31-9a07-4206375a4b9b',
						name: 'Complete',
					},
				],
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiStatus.getAll = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onGetStatus(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onGetStages', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				data: [
					{
						id: 'guid-Id',
						name: 'backend',
					},
					{
						id: 'guid-Id-2',
						name: 'frontend',
					},
				],
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			programVersionsAPI.getSingle = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onGetStages(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onGetCurrentStage', async () => {
			const mockPayload = 'guid-backend';

			const mockResponse = {
				data: [
					{
						id: 'guid-Id',
						name: 'backend',
					},
				],
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiScholar.getSingle = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onGetCurrentStage(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onGetAttachments', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				data: {
					id: 1,
				},
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			attachmentsApi.getSingle = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onGetAttachments(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onDeleteAttachment', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				data: {
					id: 1,
				},
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			attachmentsApi.deleteSingle = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onDeleteAttachment(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onGetUsersToNotify', async () => {
			const mockPayload = { criteria: 'a' };

			const mockResponse = {
				data: [
					{
						id: 'a2a327c1-8ea7-427a-9f6c-57450616daa6',
						firstName: 'Andres',
						lastName: 'Perez',
						email: 'andres.perez@fundacion-jala.org',
						ci: 3456739,
						issued: 'CBBA',
						phoneNumber: 768910934,
						currentCity: 'Cochabamba',
					},
					{
						id: '9b39b96c-7b35-4260-af4a-e52c8e80671b',
						firstName: 'Juan',
						lastName: 'Perez',
						email: 'juan.perez@fundacion-jala.org',
						ci: 3456789,
						issued: 'CBBA',
						phoneNumber: 76890934,
						currentCity: 'Cochabamba',
					},
				],
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			apiUsers.getAllWithParams = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onGetUsersToNotify(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onSendNotifications', async () => {
			const mockPayload = [
				{
					userId: 'a2a327c1-8ea7-427a-9f6c-57450616daa6',
					title: 'title',
					description: 'description',
					type: 'event',
					isRead: false,
				},
				{
					userId: '9b39b96c-7b35-4260-af4a-e52c8e80671b',
					title: 'title',
					description: 'description',
					type: 'event',
					isRead: false,
				},
			];

			const mockResponse = {
				message: 'Notification sent succesfully',
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			notificationsAPI.post = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onSendNotifications(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should return data from onSendEmails', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				data: {
					id: 1,
				},
			};

			const mockState = {
				isLoading: false,
				errorMessages: [],
			};

			notificationsAPI.post = jest.fn(() => Promise.resolve(mockResponse.data));

			const newState = eventsReducer(mockState, onSendEmails(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
		it('should dispatch the correct action action when api fails', async () => {
			const mockPayload = {
				id: 1,
			};

			const mockResponse = {
				error: 'some error',
			};

			const mockState = {
				errorMessages: {
					id: 1,
				},
			};

			notificationsAPI.post = jest.fn(() => Promise.reject(mockResponse.error));

			const newState = eventsReducer(mockState, onSendEmails(mockPayload));

			expect(newState).toEqual({
				...mockState,
			});
		});
	});
});
