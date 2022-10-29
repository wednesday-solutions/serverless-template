import { GetParametersCommand } from '@aws-sdk/client-ssm';

import { CREATE_REMINDER_CONSTANTS } from '@utils/constants/sesConstants';
import { ssmClient } from './ssmClient';

const { correctEmailsRequiredMessage } = CREATE_REMINDER_CONSTANTS;

/**
 * @description a function to fetch parameters stored in the parameter store
 * @param {array} paramNames - an array with names of variables to be fetched from
 *  parameter store; names should be same as the ones stored in parameter store
 * @returns an object with "error" or "data" based on success or failure in fetching params
 */
export async function getParamsFromSSM(paramNames) {
	const command = new GetParametersCommand({ Names: [...paramNames] });
	const response = await ssmClient.send(command);
	return handleSSMResponse(response, correctEmailsRequiredMessage);
}

function handleSSMResponse(response, errorMessage) {
	if (response.invalidParameters.length) {
		return { error: errorMessage };
	}
	const fornattedResponse = response.map((paramData) => ({
		name: paramData.Parameters.Name,
		value: paramData.Parameters.Value,
	}));
	return { data: fornattedResponse };
}
