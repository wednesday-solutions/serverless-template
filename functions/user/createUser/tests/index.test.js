import {
	CREATE_USER_MOCK,
	CREATE_USER_ERROR_MOCK,
} from '@utils/mockData/mockData';
import * as utils from '@src/interface-adaptors/daos/user';
import { create, handler } from '../index';

describe('create user function tests', () => {
	let event;
	let logger;
	afterEach(() => {
		jest.clearAllMocks();
	});
	beforeEach(() => {
		jest.spyOn(utils, 'createUser').mockResolvedValue(CREATE_USER_MOCK);
	});
	beforeAll(() => {
		event = {
			body: CREATE_USER_MOCK.data,
		};
	});

	it('should create User properly', async () => {
		const res = await create(event, { logger });
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe(CREATE_USER_MOCK.message);
	});

	it('If create user fails', async () => {
		jest
			.spyOn(utils, 'createUser')
			.mockRejectedValueOnce(CREATE_USER_ERROR_MOCK);
		const res = await create(event, { logger });
		expect(res.message).toBe(CREATE_USER_ERROR_MOCK.message);
		expect(res.body.code).toBe(CREATE_USER_ERROR_MOCK.error.code);
		expect(res.body.message).toBe(CREATE_USER_ERROR_MOCK.error.message);
	});

	it('should throw error if User is not created properly', async () => {
		const res = await handler(
			{
				body: {
					uuid: 'c0487589-0abe-4545-aeb6-ab8f53d56a97',
				},
			},
			{ logger },
		);
		expect(JSON.parse(res.body).code).toBe('E3');
	});
});
