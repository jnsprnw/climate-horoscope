async function fetchContent() {
  const result = await fetch(
    `https://api.notion.com/v1/databases/${import.meta.env.VITE_NOTION_API_TEXTS}/query`,
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

async function getNotionTable() {
  const response = await fetchContent();
  const { results } = response;
  console.log({ results })
  return results
    .map((item) => {
      const props = item.properties;
      const description = (props['Description'].title ?? []).map(({ plain_text }) => plain_text).join('').trim();
      const house = props['House'].select?.name;
      const topic = props['Topic'].select?.name;
      const rating = props['Rating'].number;
      const planet = props['Planet'].select?.name;

      return {
        description,
        house,
        topic,
        rating,
        planet
      }
    }).filter(({ description }) => Boolean(description))
}

export async function load() {
  const data = await getNotionTable();
  return {
    data,
  };
}
