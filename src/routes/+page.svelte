<script>
  import { REGIONS, RISKS_LABELS } from '$lib/../config.js';
  import { VALUES, CURRENT_REGION_INDEX, PROBABILITIES, SENTENCE, SENTENCES, DATE, SIGN, SIGNS, DOS, DOS_SELECTION } from '$lib/../store.js';
  import Button from '$lib/Regions/Button.svelte';
  

  $: console.log($DOS, $DOS_SELECTION)

</script>

<!-- {$VALUES} -->


<div class="grid items-center justify-center gap-y-5 relative z-10 my-5 md:my-20 px-2">
  <header class="max-w-2xl border p-5 md:p-10 border-gray-900 bg-white flex flex-col gap-y-6">
    <h1 class="font-serif text-2xl text-gray-700">Climate—Fortunes</h1>
    <p class="text-sm text-gray-700 max-w-prose leading-relaxed">Welcome to your Climate Horoscope, where we navigate the turbulent skies of a world affected by climate change. Let us delve into the atmospheric energies that will shape your day and shed light on the evolving weather patterns around us in times of the climate crisis.</p>
  </header>

  <div class="flex gap-2 max-w-2xl border p-5 md:p-10 border-gray-900 gap-y-10 flex-col mt-10 bg-white">
    <div class="flex gap-y-5 flex-col">
      <h2 class="text-center font-serif text-lg w-full">Tell us your birthdate</h2>
      <input type="date" bind:value={$DATE} class="border-b border-gray-900 text-gray-500 text-xs uppercase text-center focus:outline-none focus:text-gray-900" />
    </div>
  <div class="flex gap-y-5 flex-col">
    <h2 class="text-center font-serif text-lg w-full">Choose your region</h2>
    <div class="flex gap-x-2 gap-y-4 flex-wrap w-full justify-center">
      {#each REGIONS as region, index}
      <Button {region} {index} />
      {/each}
    </div>
  </div>
  </div>

  {#if $SENTENCE || $SIGN}
  <div class="flex gap-2 max-w-2xl border p-5 md:p-10 border-gray-900 gap-y-5 flex-col mt-10 bg-white">
    <h2 class="text-center font-serif text-2xl w-full">Your climate fortune</h2>
    {#if $SENTENCE}
    <p class="text-sm text-gray-700 max-w-prose leading-relaxed">{$SENTENCE.description}</p>
    {/if}
    <!-- {JSON.stringify($DOS_SELECTION)} -->
    {#if $DOS_SELECTION && $DOS_SELECTION.length}
    <div>
    <h3 class="font-serif text-md mb-2">Do’s</h3>
    <ul>
    {#each $DOS_SELECTION as do_item}
      <li class="text-sm text-gray-700 max-w-prose leading-relaxed">— {do_item.text}</li>
    {/each}
    </ul>
    </div>
    {/if}
    {#if $SIGN}
    <h3 class="text-center font-serif text-md w-full">{$SIGN.id} / {$SIGN.newSign}</h3>
    <p class="text-sm text-gray-700 max-w-prose leading-relaxed">{$SIGN.description}</p>
    {/if}
  </div>
  {/if}

  <div class="flex gap-2 max-w-2xl border p-5 md:p-10 border-gray-900 gap-y-5 flex-col mt-10 items-center bg-white">
    <p class="text-sm text-gray-700 max-w-prose leading-relaxed">Remember, dear friends, that we are interconnected with the planet we call home. By nurturing our environment, embracing sustainable practices, advocating for change, both on a personal and political level, we can collectively steer our world towards a brighter and greener future. <a href="/about" class="underline decoration-gray-400 hover:decoration-gray-900 transition-colors">Find out more about this project here.</a></p>
    <p class="text-sm text-gray-700 max-w-prose leading-relaxed">Developed during the Environmental Data, Media and the Humanities-Hackathon, 31 May - 2 June 2023, Potsdam, organised by the network of digital humanities of Potsdam University in collaboration with Lukas Diestel, Maximilian Hepach, Giacomo Marinsalta, Sybille Neumeyer, Jonas Parnow, Birgit Schneider, May Ee Wong, funded by the Alexander von Humboldt Foundation. </p>
  </div>
</div>

<!-- SENTENCE: {JSON.stringify($SENTENCE, null, 2)} -->

<!-- <pre class="text-xs">{JSON.stringify($PROBABILITIES, null, 2)}</pre> -->

<!-- <pre class="text-xs">{JSON.stringify($SENTENCES, null, 2)}</pre> -->

<!-- <ul>
{#each RISKS_LABELS as label, i}
<li>{label}: {$VALUES[i]}</li>
{/each}
</ul> -->