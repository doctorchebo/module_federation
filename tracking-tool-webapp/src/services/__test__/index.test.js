import loggerService from '../LoggerService';

const getSpy = (type) => {
	return { loggerService, spy: jest.spyOn(loggerService, type) };
};

describe('services/LoggerService', () => {
	describe('Warn message', () => {
		it('Should warn is a function', () => {
			const { loggerService, spy } = getSpy('warn');
			loggerService.warn('warn context', 'warn message');
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy.mock.calls).toEqual([['warn context', 'warn message']]);
		});
	});
	describe('Error message', () => {
		it('Should error is a function', () => {
			const { loggerService, spy } = getSpy('error');
			loggerService.error('error context', 'error message');
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy.mock.calls).toEqual([['error context', 'error message']]);
		});
	});
	describe('Info message', () => {
		it('Should info is a function', () => {
			const { loggerService, spy } = getSpy('info');
			loggerService.info('info context', 'info message');
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy.mock.calls).toEqual([['info context', 'info message']]);
		});
	});
	describe('Debug message', () => {
		it('Should debug is a function', () => {
			const { loggerService, spy } = getSpy('debug');
			loggerService.debug('debug context', 'debug message');
			expect(spy).toHaveBeenCalledTimes(1);
			expect(spy.mock.calls).toEqual([['debug context', 'debug message']]);
		});
	});
});
