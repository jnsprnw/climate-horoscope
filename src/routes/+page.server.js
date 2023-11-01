import donts from '$data/donts.json';
import dos from '$data/dos.json';
import houses from '$data/houses.json';
import sentences from '$data/sentences.json';
import signs from '$data/signs.json';
import tarots from '$data/tarots.json';

export async function load() {
  return {
    sentences,
    signs,
    dos,
    donts,
    houses,
    tarots,
  };
}
