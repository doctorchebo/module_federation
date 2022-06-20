const { createLogger, transports, format } = require('winston');
const { combine, printf, colorize, timestamp } = format;

class LoggerService {
	constructor() {
		if (!LoggerService.instance) {
			LoggerService.instance = this;
			this.logger = this.buildLogger();
		}
		return LoggerService.instance;
	}

	buildLogger() {
		const logFormat = printf(({ timestamp, level, message, context }) => {
			return `${timestamp} ${level} : ${context} | ${message}`;
		});

		return createLogger({
			format: combine(
				colorize({ all: true }),
				timestamp({
					format: 'YYYY-MM-DD HH:mm:ss',
				}),
				logFormat
			),
			transports: [new transports.Console()],
		});
	}
	info(message, context) {
		this.logger.info(message, { context });
	}
	debug(message, context) {
		this.logger.debug(message, { context });
	}
	error(message, context) {
		this.logger.error(message, { context });
	}
	warn(message, context) {
		this.logger.warn(message, { context });
	}
}
const instance = new LoggerService();

export default instance;
