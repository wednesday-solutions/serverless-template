import { baseHandler } from '../index';

describe('starter function tests', () => {
	let event;
	let logger;
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should call the starter function', async () => {
		const res = await baseHandler(event, { logger });
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe('Hey from Daily cron!');
	});
});
