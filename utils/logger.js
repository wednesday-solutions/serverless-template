import pino from 'pino';
import { isLocal } from '@utils';

// eslint-disable-next-line import/no-mutable-exports
let logger = console;

export const initializeLogger = (destination) => {
	logger = pino(
		{
			base: {
				memorySize: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
				region: process.env.AWS_REGION,
				runtime: process.env.AWS_EXECUTION_ENV,
				version: process.env.AWS_LAMBDA_FUNCTION_VERSION,
			},
			name: process.env.AWS_LAMBDA_FUNCTION_NAME,
			level: process.env.LOG_LEVEL || 'info',
			useLevelLabels: true,
		},
		isLocal() ? null : destination,
	);
	return logger;
};

export default logger;
