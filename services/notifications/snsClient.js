import { SNSClient } from '@aws-sdk/client-sns';

// create SNS service object instance
export const snsClient = new SNSClient({ region: process.env.REGION });
