<script>
  import { CURRENT_REGION_INDEX } from '$lib/../store.js';

  export let region;
  export let index;
  export let fortune;

  $: isActive = $CURRENT_REGION_INDEX === index;

  function change(index) {
    CURRENT_REGION_INDEX.set(index)
    fortune.scrollIntoView();
  }
</script>

<button
  class="px-4 py-2 border border-gray-900 text-xs uppercase"
  class:bg-white={!isActive}
  class:bg-gray-900={isActive}
  class:text-white={isActive}
  on:click={() => change(index)}>{region}</button>
