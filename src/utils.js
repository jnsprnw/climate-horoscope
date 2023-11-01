import { get } from 'lodash-es';

export function getValue(data, region, risk, temperature, age) {
  return get(data, [region, risk, temperature, age], 0);
}

export function generateFilledArray(n) {
  return [...Array(n).keys()].map((i) => i);
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
