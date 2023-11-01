import { page } from '$app/stores';
import data from '$lib/data/data.json';
import { derived, writable } from 'svelte/store';
import zodiac from 'zodiac-signs';

import { DEFAULT_AGE, DEFAULT_REGION, DEFAULT_TEMPERATURE, LAST_YEAR, RISKS, RISKS_LABELS } from './config.js';
import { getValue } from './utils.js';

function getNUniqueRandomNumbers(n, max) {
  var arr = [];
  while (arr.length < n) {
    const r = Math.floor(Math.random() * max);
    if (arr.indexOf(r) === -1) {
      arr.push(r);
    }
  }
  return arr;
}

function getUniqueRandomFromArray(arr) {
  if (arr.length) {
    const indices = getNUniqueRandomNumbers(3, arr.length);
    return indices.map((i) => arr[i]);
  } else {
    return [];
  }
}

const getSign = zodiac();

export const SENTENCES = derived(page, ($page) => $page.data?.sentences ?? []);
export const SIGNS = derived(page, ($page) => $page.data?.signs ?? []);
export const DOS = derived(page, ($page) => $page.data?.dos ?? []);
export const DONTS = derived(page, ($page) => $page.data?.donts ?? []);
export const HOUSES = derived(page, ($page) => $page.data?.houses ?? []);
export const TAROTS = derived(page, ($page) => $page.data?.tarots ?? []);

export const DATUM = writable(data);

export const CURRENT_REGION_INDEX = writable(DEFAULT_REGION);
export const CURRENT_TEMPERATURE_INDEX = writable(DEFAULT_TEMPERATURE);

export const VALUES = derived([DATUM, CURRENT_REGION_INDEX], ([$data, $region]) => {
  return RISKS.map((r, n) => getValue($data, $region, n, DEFAULT_TEMPERATURE, new Date().getFullYear() - (LAST_YEAR - DEFAULT_AGE)));
});

export const PROBABILITIES = derived(VALUES, ($values) => {
  return $values
    .map((value, index) => ({ value, index }))
    .sort((a, b) => a.value - b.value)
    .map(({ value, index }) => [...Array(value * 10).keys()].map(() => index))
    .flat();
});

export const TOPICS = derived(PROBABILITIES, ($probabilities) => {
  const index = Math.floor(Math.random() * $probabilities.length);
  return [...[RISKS_LABELS[$probabilities[index]]]];
});

const f = (event, topic) => event === ['all'] || event.includes(topic);

export const DOS_SELECTION = derived([TOPICS, DOS], ([$topics, $dos]) => {
  const label = $topics[0];
  const datum = $dos.filter(({ event }) => f(event, label));
  return getUniqueRandomFromArray(datum);
});

export const DONTS_SELECTION = derived([TOPICS, DONTS], ([$topics, $donts]) => {
  const label = $topics[0];
  const datum = $donts.filter(({ event }) => f(event, label));
  return getUniqueRandomFromArray(datum);
});

export const SENTENCE = derived([TOPICS, SENTENCES], ([$topics, $sentences]) => {
  const label = $topics[0];
  const selection = $sentences.filter(({ topic }) => label === topic);
  const sentence = selection[Math.floor(Math.random() * selection.length)];
  return sentence;
});

export const HOUSE = derived([SENTENCE, HOUSES], ([$sentence, $houses]) => {
  const house = $sentence?.house ?? 0;
  return $houses.find(({ number }) => number === house);
});

export const DATE = writable(null);

export const SIGN = derived([DATE, SIGNS], ([$date, $signs]) => {
  const date = new Date($date);
  const month = date.getMonth() + 1;
  const day = date.getDay();
  if ($date && month && day) {
    const sign_classic = getSign.getSignByDate({ day, month }).name;
    const sign_new = ($signs ?? []).find(({ id }) => id === sign_classic);
    return sign_new;
  }
  return undefined;
});

export const TAROT_NUMBER = writable(null);

export const TAROT_CARD = derived([TAROT_NUMBER, TAROTS], ([$number, $tarots]) => {
  return $tarots.find(({ number }) => number === $number);
});
