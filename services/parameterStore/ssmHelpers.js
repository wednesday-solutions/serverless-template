import { GetParametersCommand } from '@aws-sdk/client-ssm';
import { ssmClient } from './ssmClient';

export function handleSSMResponse(response, errorMessage) {
	if (response.InvalidParameters?.length) {
		return { error: errorMessage };
	}
	const formattedResponse = response.Parameters.map((paramData) => ({
		name: paramData.Name,
		value: paramData.Value,
	}));
	return { data: formattedResponse };
}

/**
 * @description a function to fetch parameters stored in the parameter store
 * @param {array} paramNames - an array with names of variables to be fetched from
 *  parameter store; names should be same as the ones stored in parameter store
 * @param {string} errorMessage -  error message to be returned in case of failure
 * @returns an object with "error" or "data" based on success or failure in fetching params
 */
export async function getParamsFromSSM(paramNames, errorMessage) {
	try {
		const command = new GetParametersCommand({ Names: [...paramNames] });
		const response = await ssmClient.send(command);
		return handleSSMResponse(response, errorMessage);
	} catch (error) {
		return { error: error?.message };
	}
}
