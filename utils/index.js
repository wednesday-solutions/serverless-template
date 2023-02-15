import { snakeCase } from 'lodash';

export const mapKeysDeep = (obj, fn) =>
	Array.isArray(obj)
		? obj.map((val) => mapKeysDeep(val, fn))
		: typeof obj === 'object'
		? Object.keys(obj).reduce((acc, current) => {
				const key = fn(current);
				const val = obj[current];
				acc[key] =
					val !== null && typeof val === 'object' ? mapKeysDeep(val, fn) : val;
				return acc;
		  }, {})
		: obj;

export const transformToSnakeCase = (payload) =>
	mapKeysDeep(payload, (keys) => snakeCase(keys));
