import { get } from 'lodash-es';

export function getValue (data, region, risk, temperature, age) {
	return get(data, [region, risk, temperature, age], 0);
}