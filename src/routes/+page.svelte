<script>
  import { REGIONS, RISKS_LABELS } from '$lib/../config.js';
  import { VALUES, CURRENT_REGION_INDEX, PROBABILITIES, OUTPUT, SENTENCES } from '$lib/../store.js';
  import Button from '$lib/Regions/Button.svelte';

</script>

<!-- {$VALUES} -->

<div class="grid items-center justify-center gap-y-5">
  <div class="flex gap-2 max-w-3xl border p-10 border-gray-900 gap-y-5 flex-col mt-10">
    <h2 class="text-center font-serif text-lg w-full">Choose your origin</h2>
    <div class="flex gap-2 flex-wrap justify-center">
      {#each REGIONS as region, index}
      <Button {region} {index} />
      {/each}
    </div>
  </div>

  {#if $OUTPUT}
  <div class="flex gap-2 max-w-3xl border p-10 border-gray-900 gap-y-5 flex-col mt-10 items-center">
    <h2 class="text-center font-serif text-lg w-full">Your destiny</h2>
    <p class="text-sm text-gray-700 max-w-prose leading-relaxed">{$OUTPUT.description}</p>
    <dl class="text-xs flex justify-center gap-x-2">
      <dt class="text-gray-500">House</dt>
      <dd class="font-semibold text-gray-500 uppercase">{$OUTPUT.house}</dd>
      <dt class="text-gray-500">Topic</dt>
      <dd class="font-semibold text-gray-500 uppercase">{$OUTPUT.topic}</dd>
      <dt class="text-gray-500">Rating</dt>
      <dd class="font-semibold text-gray-500 uppercase">{$OUTPUT.rating}</dd>
    </dl>
  </div>
  {/if}
</div>

<!-- Output: {JSON.stringify($OUTPUT, null, 2)} -->

<!-- <pre class="text-xs">{JSON.stringify($PROBABILITIES, null, 2)}</pre> -->

<!-- <pre class="text-xs">{JSON.stringify($SENTENCES, null, 2)}</pre> -->

<!-- <ul>
{#each RISKS_LABELS as label, i}
<li>{label}: {$VALUES[i]}</li>
{/each}
</ul> -->