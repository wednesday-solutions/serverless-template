import { SSMClient } from '@aws-sdk/client-ssm';

export const ssmClient = new SSMClient({ region: process.env.REGION });
