import { StarterFunctionSuccessMessage } from '@utils/mockData/starterFunctionMockData';
import { baseHandler } from '../index';

describe('agree terms function tests', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should call the agree terms function', async () => {
		const res = await baseHandler();
		expect(res.statusCode).toBe(200);
		expect(res.body.message).toBe(StarterFunctionSuccessMessage);
	});
});
