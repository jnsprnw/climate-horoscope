<script>
  import "../app.css";
  import Chart from '$lib/Chart/Chart.svelte';

  let url = 'https://climate-horoscope.netlify.app/';
  let title = 'Climate—Fortunes';
  let description = 'Welcome to your Climate Horoscope, where we navigate the turbulent skies of a world affected by climate change. Let us delve into the atmospheric energies that will shape your day and shed light on the evolving weather patterns around us in times of the climate crisis.';
</script>

<svelte:head>
  <title>{ title }</title>
  <link rel="canonical" href="{url}/" />
  <meta name="description" content={description} />

  <meta name="robots" content="max-image-preview:large" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image:src" content="/og-image_landscape.png" />
  <meta name="twitter:site" content={url} />
  <meta name="twitter:title" content={title} />

  <meta property="og:description" content={description} />
  <meta property="og:image" content="/og-image_landscape.png" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:site_name" content={title} />
  <meta property="og:title" content={title} />
  <meta property="og:type" content="article" />
  <meta property="og:url" content={url} />
</svelte:head>

<Chart />
<slot />