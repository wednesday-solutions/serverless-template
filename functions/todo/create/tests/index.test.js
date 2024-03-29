import {
	CREATE_TODO_MOCK,
	CREATE_TODO_ERROR_MOCK,
} from '@utils/mockData/mockData';
import * as utils from '@src/interface-adaptors/daos/todo';
import { createTodoHandler, handler } from '../index';

describe('create todo function tests', () => {
	let event;
	let logger;
	afterEach(() => {
		jest.clearAllMocks();
	});
	beforeEach(() => {
		jest.spyOn(utils, 'createTodo').mockResolvedValue(CREATE_TODO_MOCK);
	});
	beforeAll(() => {
		event = {
			body: CREATE_TODO_MOCK.data,
		};
	});

	it('should create Todo properly', async () => {
		const res = await createTodoHandler(event, { logger });
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe(CREATE_TODO_MOCK.message);
	});

	it('should create Todo fails', async () => {
		jest
			.spyOn(utils, 'createTodo')
			.mockRejectedValueOnce(CREATE_TODO_ERROR_MOCK);
		const res = await createTodoHandler(event, { logger });
		expect(res.message).toBe(CREATE_TODO_ERROR_MOCK.message);
		expect(res.body.code).toBe(CREATE_TODO_ERROR_MOCK.error.code);
		expect(res.body.message).toBe(CREATE_TODO_ERROR_MOCK.error.message);
	});

	it('should throw error if Todo is not created properly', async () => {
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
