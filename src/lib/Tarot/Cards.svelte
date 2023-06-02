<script>
  import { generateFilledArray, shuffle } from '$lib/../utils.js';
  import { TAROT_NUMBER } from '$lib/../store.js';

  const cards = shuffle(generateFilledArray(21));
  export let card;

  function change(number) {
    TAROT_NUMBER.set(number)
    card.scrollIntoView();
  }
  
</script>

<div class="grid grid-cols-3 sm:grid-cols-7 md:grid-cols-7 w-full gap-8 sm:gap-3">
  {#each cards as i}
    {@const number = i + 1}
    {@const isActive = $TAROT_NUMBER === number}
    {@const background = isActive ? `tarot-new-${number}.webp` : `CardBacks.jpg`}
    <button
      on:click={() => change(number)}
      style="background-image: url(/tarot/{background}); aspect-ratio: 300 / 527;"
      class="border rounded-md shadow-sm py-5 hover:shadow-md bg-cover"
      class:bg-gray-900={$TAROT_NUMBER === number}
      class:hover:bg-amber-100={$TAROT_NUMBER !== number}
      class:bg-amber-100={$TAROT_NUMBER !== number}> </button>
  {/each}
</div>