import { act } from 'react-dom/test-utils';
import LoggerService from 'services/LoggerService';
import SubjectDetailsFactory from '../actions';
import apiSubjectDetails from 'api/models/subjectDetails';
import apiSubjectEvaluation from 'api/models/subjectEvaluation';

describe('src/pages/dashboard/sections/subjects/context', () => {
	let factory;
	let mockedDispatch;

	beforeEach(() => {
		mockedDispatch = jest.fn();
		factory = SubjectDetailsFactory(mockedDispatch);
	});

	describe('Types', () => {
		it('Should return the details of the subject', () => {
			const onLoadSubjects = factory.onLoadSubjects;
			expect(typeof onLoadSubjects).toBe('function');
		});
	});
	describe('Api responses', () => {
		afterEach(() => {
			jest.clearAllMocks();
		});
		it('Should return the details of the subject', async () => {
			const mockResponse = [];
			apiSubjectDetails.getAll = jest.fn().mockResolvedValue(mockResponse);
			await act(async () => {
				await factory.onLoadSubjects(1);
			});

			expect(mockedDispatch).toHaveBeenCalled();
			expect(mockedDispatch).toHaveBeenCalledTimes(3);
			expect(mockedDispatch).toHaveBeenNthCalledWith(1, {
				type: 'SubjectDetails.load',
				payload: true,
			});
			expect(mockedDispatch).toHaveBeenNthCalledWith(2, {
				type: 'SubjectDetails.subjects',
				payload: mockResponse,
			});
			expect(mockedDispatch).toHaveBeenNthCalledWith(3, {
				type: 'SubjectDetails.load',
				payload: false,
			});

			apiSubjectDetails.getAll.mockRestore();
		});
		it('Should api return a error when receive a bad request', async () => {
			const mockResponse = {
				error: [
					{
						message: 'Error',
					},
				],
			};

			LoggerService.error = jest.fn();

			apiSubjectDetails.getAll = jest
				.fn()
				.mockReturnValue(Promise.reject(mockResponse.error));
			await act(async () => {
				await factory.onLoadSubjects(1);
			});

			expect(mockedDispatch).toHaveBeenCalled();
			expect(mockedDispatch).toHaveBeenCalledTimes(3);
			expect(mockedDispatch).toHaveBeenNthCalledWith(1, {
				type: 'SubjectDetails.load',
				payload: true,
			});
			expect(mockedDispatch).toHaveBeenNthCalledWith(2, {
				type: 'SubjectDetails.Error',
				payload: undefined,
			});
			expect(mockedDispatch).toHaveBeenNthCalledWith(3, {
				type: 'SubjectDetails.load',
				payload: false,
			});
			expect(LoggerService.error).toHaveBeenCalled();
			expect(LoggerService.error).toHaveBeenCalledWith(mockResponse.error);

			apiSubjectDetails.getAll.mockRestore();
			LoggerService.error.mockRestore();
		});
		it('Should delete an evaluation', async () => {
			const mockResponse = {
				data: {
					id: '89d01628-208e-41f7-8959-b080d7212958',
					subjectId: 'df215e10-8bd4-4401-b2dc-99bb03135f13',
					scholarId: '11221111-1d83-44d5-b264-1e17feabd322',
					gradeId: 'a7ffd924-aff6-410a-98a1-133bc399126d',
					comment: 'test comment',
					isPublished: false,
					evaluationDate: '2022-05-10T16:42:47.08',
				},
			};
			apiSubjectEvaluation.deleteSingle = jest.fn().mockResolvedValue(mockResponse);
			await act(async () => {
				await factory.onDeleteEvaluation();
			});

			expect(mockedDispatch).toHaveBeenCalled();
			expect(mockedDispatch).toHaveBeenCalledTimes(1);
			expect(mockedDispatch).toHaveBeenNthCalledWith(1, {
				type: 'SubjectDetails.loadEvaluations',
				payload: false,
			});
			apiSubjectEvaluation.deleteSingle.mockRestore();
		});
		it('Should return an error when delete an evaluation with bad request', async () => {
			const mockResponse = {
				error: [
					{
						message: 'Error',
					},
				],
			};
			LoggerService.error = jest.fn();
			apiSubjectEvaluation.deleteSingle = jest
				.fn()
				.mockResolvedValue(Promise.reject(mockResponse.error));
			await act(async () => {
				await factory.onDeleteEvaluation();
			});

			expect(mockedDispatch).toHaveBeenCalled();
			expect(mockedDispatch).toHaveBeenCalledTimes(2);
			expect(mockedDispatch).toHaveBeenNthCalledWith(1, {
				type: 'SubjectDetails.Error',
				payload: undefined,
			});
			expect(mockedDispatch).toHaveBeenNthCalledWith(2, {
				type: 'SubjectDetails.loadEvaluations',
				payload: false,
			});
			expect(LoggerService.error).toHaveBeenCalled();
			expect(LoggerService.error).toHaveBeenCalledWith(mockResponse.error);
			apiSubjectEvaluation.deleteSingle.mockRestore();
		});
	});
});
