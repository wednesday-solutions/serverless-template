import { StarterFunctionSuccessMessage } from '@utils/mockData/mockData';
import { baseHandler } from '../index';

describe('starter function tests', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should call the starter function', async () => {
		const res = await baseHandler();
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe(StarterFunctionSuccessMessage);
	});
});
