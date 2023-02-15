import { SESClient } from '@aws-sdk/client-ses';

export const sesClient = new SESClient({
	region: process.env.REGION,
	apiVersion: '2010-12-01',
});
