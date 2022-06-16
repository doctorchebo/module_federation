import { isTheRouteCorrectWithDesiredPath, getPathRedirected, getUrl } from '../menuPath';

describe('/components/subjectAccordion/helpers/menuPath', () => {
	const locationMock = {
		pathname: 'test/subjects',
	};

	describe('isTheRouteCorrectWithDesiredPath function', () => {
		it('should get true if the route is with the desired path', () => {
			const desiredPath = 'subjects';
			const result = isTheRouteCorrectWithDesiredPath(locationMock, desiredPath);
			expect(result).toBe(true);
		});
		it('should get false if the route is not with the desired path', () => {
			const desiredPath = 'scholars';
			const result = isTheRouteCorrectWithDesiredPath(locationMock, desiredPath);
			expect(result).toBe(false);
		});
	});

	describe('getPathRedirected function', () => {
		it('should get the default path it there no exists subjects', () => {
			const subjects = [];
			const defaultPath = 'test/subjects';
			const result = getPathRedirected(subjects, defaultPath);
			expect(result).toBe(defaultPath);
		});
		it('should get the path in the first subject', () => {
			const subjects = [
				{
					subjectId: '1234-44d5-b264-1e17feabd322',
				},
			];
			const desiredResult = `/dashboard/subjects/${subjects[0].subjectId}`;
			const defaultPath = 'test/subjects';
			const result = getPathRedirected(subjects, defaultPath);
			expect(result).toBe(desiredResult);
		});
	});

	describe('getUrl function', () => {
		it('should get a url based on a subject name whithout a root path', () => {
			const complement = 'javascript';
			const desiredResult = `/dashboard/subjects/${complement}`;
			const result = getUrl(complement);
			expect(result).toBe(desiredResult);
		});
		it('should get a url based on a subject name with a root path', () => {
			const complement = 'javascript';
			const rootPath = 'scholars/';
			const desiredResult = `scholars/${complement}`;
			const result = getUrl(complement, rootPath);
			expect(result).toBe(desiredResult);
		});
	});
});
