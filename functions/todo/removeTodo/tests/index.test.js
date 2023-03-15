import { DELETE_TODO_MOCK, CREATE_TODO_MOCK } from '@utils/mockData/mockData';
import * as utils from '@src/interface-adaptors/daos/todo';
import { deleteTodoHandler, handler } from '../index';

describe('delete todo function tests', () => {
	let event;
	let logger;
	afterEach(() => {
		jest.clearAllMocks();
	});
	beforeEach(() => {
		jest.spyOn(utils, 'deleteByUuid').mockResolvedValue(DELETE_TODO_MOCK);
	});
	beforeAll(() => {
		event = {
			body: CREATE_TODO_MOCK.data.uuid,
		};
	});

	it('should delete Todo properly', async () => {
		const res = await deleteTodoHandler(event, { logger });
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe(DELETE_TODO_MOCK.message);
	});

	it('should throw error if Todo is not deleted properly', async () => {
		const res = await handler(
			{
				body: {
					uuid: 1,
				},
			},
			{ logger },
		);
		expect(JSON.parse(res.body).code).toBe('E3');
	});
});
