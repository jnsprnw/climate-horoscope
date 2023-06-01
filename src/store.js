import { page } from '$app/stores';
import data from '$lib/data/data.json';
import {
	derived,
	writable
} from 'svelte/store';

import {
	DEFAULT_AGE,
	DEFAULT_REGION,
	DEFAULT_TEMPERATURE,
	LAST_YEAR,
	RISKS,
	RISKS_LABELS
} from './config.js';
import { getValue } from './utils.js';

export const SENTENCES = derived(
  page,
  ($page) => $page.data?.data ?? []
);

export const DATUM = writable(data);

export const CURRENT_YEAR = writable(LAST_YEAR - DEFAULT_AGE);
export const CURRENT_AGE = derived(
  CURRENT_YEAR,
  ($year) => new Date().getFullYear() - $year
);
export const CURRENT_REGION_INDEX = writable(DEFAULT_REGION);
export const CURRENT_TEMPERATURE_INDEX = writable(DEFAULT_TEMPERATURE);

export const VALUES = derived(
  [DATUM, CURRENT_AGE, CURRENT_REGION_INDEX, CURRENT_TEMPERATURE_INDEX],
  ([$data, $age, $region, $temperature]) => {
    return RISKS.map((r, n) => getValue($data, $region, n, $temperature, $age));
  }
);

export const PROBABILITIES = derived(
  VALUES,
  ($values) => {
    return $values
      .map((value, index) => ({ value, index })).sort((a, b) => a.value - b.value)
      .map(({ value, index }) => [ ...Array(value * 10).keys() ].map(() => index)).flat();
  }
);

export const OUTPUT = derived([PROBABILITIES, SENTENCES], ([$probabilities, $sentences]) => {
  var idx = $probabilities[Math.floor(Math.random() * $probabilities.length)];
  const topicx = RISKS_LABELS[idx];
  const selection =  $sentences.filter(({ topic }) => topic === topicx)
  return selection[Math.floor(Math.random() * selection.length)]
  // return {idx, topic};
})