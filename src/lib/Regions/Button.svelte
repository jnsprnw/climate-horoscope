<script>
  import { CURRENT_REGION_INDEX } from '$lib/../store.js';

  export let region;
  export let index;

  $: isActive = $CURRENT_REGION_INDEX === index;
</script>

<button
  class="px-4 py-2 border border-gray-900 text-xs uppercase"
  class:bg-white={!isActive}
  class:bg-gray-900={isActive}
  class:text-white={isActive}
  on:click={() => CURRENT_REGION_INDEX.set(index)}>{region}</button>
