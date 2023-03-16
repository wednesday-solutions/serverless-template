import {
	CREATE_TODO_MOCK,
	UPDATE_TODO_MOCK,
	CREATE_TODO_ERROR_MOCK,
} from '@utils/mockData/mockData';
import * as utils from '@src/interface-adaptors/daos/todo';
import { updateHandler, handler } from '../index';

describe('update todo function tests', () => {
	let event;
	let logger;
	afterEach(() => {
		jest.clearAllMocks();
	});
	beforeEach(() => {
		jest.spyOn(utils, 'updateTodo').mockResolvedValue(UPDATE_TODO_MOCK);
	});
	beforeAll(() => {
		event = {
			body: CREATE_TODO_MOCK.data,
		};
	});

	it('should update Todo properly', async () => {
		const res = await updateHandler(event, { logger });
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe(UPDATE_TODO_MOCK.message);
	});

	it('should update Todo fails', async () => {
		jest
			.spyOn(utils, 'updateTodo')
			.mockRejectedValueOnce(CREATE_TODO_ERROR_MOCK);
		const res = await updateHandler(event, { logger });
		expect(res.message).toBe(CREATE_TODO_ERROR_MOCK.message);
		expect(res.body.code).toBe(CREATE_TODO_ERROR_MOCK.error.code);
		expect(res.body.message).toBe(CREATE_TODO_ERROR_MOCK.error.message);
	});

	it('should throw error if Todo is not updated properly', async () => {
		const res = await handler(
			{
				body: {
					title: 'Hi',
					description: 'Xyz',
				},
			},
			{ logger },
		);
		expect(JSON.parse(res.body).code).toBe('E3');
	});
});
