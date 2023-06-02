import { page } from '$app/stores';
import data from '$lib/data/data.json';
import {
	derived,
	writable
} from 'svelte/store';
import zodiac from 'zodiac-signs';

import {
	DEFAULT_AGE,
	DEFAULT_REGION,
	DEFAULT_TEMPERATURE,
	LAST_YEAR,
	RISKS,
	RISKS_LABELS
} from './config.js';
import { getValue } from './utils.js';

const getSign = zodiac();

export const SENTENCES = derived(page, ($page) => $page.data?.sentences ?? []);
export const SIGNS = derived(page, ($page) => $page.data?.signs ?? []);
export const DOS = derived(page, ($page) => $page.data?.dos ?? []);

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

export const TOPIC = derived(
  PROBABILITIES,
  ($probabilities) => {
    const idx = $probabilities[Math.floor(Math.random() * $probabilities.length)];
    return RISKS_LABELS[idx];
  }
);

export const DOS_SELECTION = derived([TOPIC, DOS], ([$topic, $dos]) => {
  console.log($dos, $topic)
  const dos_filter = $dos.filter(({ event }) => event === ['all'] || event.includes($topic))
  console.log({dos_filter}, dos_filter.length, Math.floor(Math.random() * dos_filter.length))
  return [...Array(3).keys()].map(() => dos_filter[Math.floor(Math.random() * dos_filter.length)]);
})

export const SENTENCE = derived([TOPIC, SENTENCES], ([$topic, $sentences]) => {
  const selection = $sentences.filter(({ topic }) => $topic === topic)
  return selection[Math.floor(Math.random() * selection.length)]
})

export const DATE = writable(null);

export const SIGN = derived(
  [DATE, SIGNS],
  ([$date, $signs]) => {
    const date = new Date($date)
    const month = date.getMonth() + 1;
    const day = date.getDay();
    console.log($date)
    if ($date && month && day) {
      const sign_classic = getSign.getSignByDate({ day, month }).name;
      console.log(sign_classic, $signs)
      const sign_new = ($signs ?? []).find(({ id }) => id === sign_classic)
      return sign_new
    }
    return undefined
  }
);