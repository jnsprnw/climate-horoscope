async function fetchContent(url) {
  const result = await fetch(
    `https://api.notion.com/v1/databases/${url}/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + import.meta.env.VITE_NOTION_API_SECRET,
        'Notion-Version': '2021-08-16',
      },
      body: JSON.stringify({
        page_size: 100,
      }),
    }
  );

  return await result.json();
}

async function getNotionFortunes() {
  const response = await fetchContent(import.meta.env.VITE_NOTION_API_FORTUNES);
  const { results } = response;
  return results
    .map((item) => {
      const props = item.properties;
      const description = (props['Description'].title ?? []).map(({ plain_text }) => plain_text).join('').trim();
      const house = parseInt(props['House'].select?.name);
      const topic = props['Topic'].select?.name;
      const rating = props['Rating'].number;
      const vibe = props['Vibe'].select?.name;

      return {
        description,
        house,
        topic,
        rating,
        vibe
      }
    }).filter(({ description }) => Boolean(description))
}

async function getNotionSigns() {
  const response = await fetchContent(import.meta.env.VITE_NOTION_API_SIGNS);
  const { results } = response;
  return results
    .map((item) => {
      const props = item.properties;
      const id = (props['Sign'].rich_text ?? []).map(({ plain_text }) => plain_text).join('').trim();
      const newSign = (props['alternative Name'].rich_text ?? []).map(({ plain_text }) => plain_text).join('').trim();
      const description = (props['alternative text'].rich_text ?? []).map(({ plain_text }) => plain_text).join('').trim();

      return {
        id,
        newSign,
        description
      }
    })
}

async function getDos() {
  const response = await fetchContent(import.meta.env.VITE_NOTION_API_DOS);
  const { results } = response;
  return results
    .map((item) => {
      const props = item.properties;
      const text = (props['Text'].title ?? []).map(({ plain_text }) => plain_text).join('').trim();
      const event = props['Weather Event'].multi_select.map(({ name }) => name);

      return {
        text,
        event
      }
    }).filter(({ text, event }) => Boolean(text) && Boolean(event))
}

async function getDonts() {
  const response = await fetchContent(import.meta.env.VITE_NOTION_API_DONTS);
  const { results } = response;
  return results
    .map((item) => {
      const props = item.properties;
      const text = (props['Text'].title ?? []).map(({ plain_text }) => plain_text).join('').trim();
      const event = props['Weather Event'].multi_select.map(({ name }) => name);

      return {
        text,
        event
      }
    }).filter(({ text, event }) => Boolean(text) && Boolean(event))
}

async function getHouses() {
  const response = await fetchContent(import.meta.env.VITE_NOTION_API_HOUSES);
  const { results } = response;
  return results
    .map((item) => {
      const props = item.properties;
      const number = props['Number'].number
      const description = (props['Climate house description'].rich_text ?? []).map(({ plain_text }) => plain_text).join('').trim();

      return {
        number,
        description
      }
    })
}

async function getTarot() {
  const response = await fetchContent(import.meta.env.VITE_NOTION_API_TAROT);
  const { results } = response;
  return results
    .map((item) => {
      const props = item.properties;
      const number = props['Number'].number
      const title = (props['Name'].title ?? []).map(({ plain_text }) => plain_text).join('').trim();
      const description = (props['Text'].rich_text ?? []).map(({ plain_text }) => plain_text).join('').trim();

      return {
        number,
        title,
        description
      }
    })
}

export async function load() {
  const sentences = await getNotionFortunes();
  const signs = await getNotionSigns();
  const dos = await getDos();
  const donts = await getDonts();
  const houses = await getHouses();
  const tarots = await getTarot();
  return {
    sentences,
    signs,
    dos,
    donts,
    houses,
    tarots
  };
}
