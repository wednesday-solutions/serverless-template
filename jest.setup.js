import 'core-js';
import AWSMock from 'aws-sdk-mock';

import dotEnv from 'dotenv';

dotEnv.config({ path: '.env' });

afterEach(() => {
	AWSMock.restore();
});
