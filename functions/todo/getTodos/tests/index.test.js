import {
	GET_TODO_MOCK,
	CREATE_TODO_ERROR_MOCK,
} from '@utils/mockData/mockData';
import * as utils from '@src/interface-adaptors/daos/todo';
import { getTodosHandler, handler } from '../index';

describe('get todos function tests', () => {
	let event;
	let logger;
	afterEach(() => {
		jest.clearAllMocks();
	});
	beforeEach(() => {
		jest.spyOn(utils, 'findByUuid').mockResolvedValue(GET_TODO_MOCK);
	});
	beforeAll(() => {
		event = {
			queryStringParameters: GET_TODO_MOCK.data[0].uuid,
		};
	});

	it('should get Todo properly', async () => {
		const res = await getTodosHandler(event, { logger });
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe(GET_TODO_MOCK.message);
	});

	it('If Todo is empty', async () => {
		jest.spyOn(utils, 'findByUuid').mockResolvedValue({});
		const res = await getTodosHandler(event, { logger });
		expect(res.body.message).toBe('Data not found');
	});

	it('should get Todo fails', async () => {
		jest
			.spyOn(utils, 'findByUuid')
			.mockRejectedValueOnce(CREATE_TODO_ERROR_MOCK);
		const res = await getTodosHandler(event, { logger });
		expect(res.message).toBe(CREATE_TODO_ERROR_MOCK.message);
		expect(res.body.code).toBe(CREATE_TODO_ERROR_MOCK.error.code);
		expect(res.body.message).toBe(CREATE_TODO_ERROR_MOCK.error.message);
	});

	it('should throw error if we do not get TODO', async () => {
		const res = await handler(
			{
				queryStringParameters: {
					uuid: 1,
				},
			},
			{ logger },
		);
		expect(JSON.parse(res.body).code).toBe('E3');
	});
});
