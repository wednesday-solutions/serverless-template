import { GET_USER_MOCK, CREATE_USER_MOCK } from '@utils/mockData/mockData';
import * as utils from '@src/interface-adaptors/daos/user';
import { getUser, handler } from '../index';

describe('get todos function tests', () => {
	let event;
	let logger;
	afterEach(() => {
		jest.clearAllMocks();
	});
	beforeEach(() => {
		jest.spyOn(utils, 'findUser').mockResolvedValue(GET_USER_MOCK);
	});
	beforeAll(() => {
		event = {
			queryStringParameters: CREATE_USER_MOCK.data.uuid,
		};
	});

	it('should get User properly', async () => {
		const res = await getUser(event, { logger });
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe(GET_USER_MOCK.message);
	});

	it('If No User is found', async () => {
		jest.spyOn(utils, 'findUser').mockResolvedValue({});
		const res = await getUser(event, { logger });
		expect(res.body.message).toBe('Data not found');
	});

	it('should throw error if we do not get User', async () => {
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
