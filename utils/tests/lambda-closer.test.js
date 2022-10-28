import LambdaCloser from '@utils/lambda-closer';

describe('LambdaCloser', () => {
	const data = {
		key: 'value',
	};
	it('should construct the response for 200', () => {
		const successResponse = {
			message: 'success_message',
			data,
		};
		const response = new LambdaCloser(successResponse).ok();
		expect(response).toEqual({
			statusCode: 200,
			body: successResponse,
		});
	});

	it('should construct the response for 201', () => {
		const successResponse = {
			message: 'success_message',
			data,
		};
		const response = new LambdaCloser(successResponse).created();
		expect(response).toEqual({
			statusCode: 201,
			body: successResponse,
		});
	});

	it('should construct a partial response for partial parameters for 200', () => {
		const partialSuccessResponse = {
			data,
		};
		const response = new LambdaCloser(partialSuccessResponse).ok();
		expect(response).toEqual({
			statusCode: 200,
			body: {
				data,
				message: undefined,
			},
		});
	});

	it('should throw an Error if none of the required response properties provided', () => {
		const invalidResponse = data;
		expect(() => {
			new LambdaCloser(invalidResponse).ok();
		}).toThrow();
	});
});
