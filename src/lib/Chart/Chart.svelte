<script>
  import { generateFilledArray, shuffle } from '$lib/../utils.js';
  import { browser, dev, building, version } from '$app/environment';
  let width;
  let height;

  $: size = width * 0.7;
  $: viewBox = [-width / 2, -height / 2, width, height];
  const houses = generateFilledArray(12);
  $: deg_step = 360 / houses.length;
  $: deg_step_half = deg_step / 2;

  $: half = size / 2;
  $: position_inner = half * 0.9;
  $: position_outer = half * 0.95;

  let angle = 0;
  function animate() {
    angle += 0.02;
    if (angle >= 360) {
      angle = 0;
    }
    
    requestAnimationFrame(animate);
  }
  if (browser) {
    requestAnimationFrame(animate);
  }
</script>

<div class="w-full h-full fixed top-0 left-0 z-0" bind:clientWidth={width} bind:clientHeight={height}>
  {#if size}
  <svg {width} {height} {viewBox}>
    <circle cx={0} cy={0} r={half} class="fill-none stroke-gray-900" />
    <circle cx={0} cy={0} r={position_inner} class="fill-none stroke-gray-900" />
    <g transform={`rotate(${angle})`} style="will-change: transform;">
      {#each houses as house, i}
        <g transform={`rotate(${deg_step * i})`}>
          <g transform={`rotate(${deg_step_half})`}>
            <line x1={half} x2={position_inner} class="stroke-1 stroke-gray-900" />
          </g>
          <!-- <House /> -->
          <!-- <text class="font-serif" transform={`rotate(90, ${position_outer}, 0)`} dominant-baseline="middle" text-anchor="middle" x={position_outer}>{ house }</text> -->
        </g>
      {/each}
    </g>
  </svg>
  {/if}
</div>

<style>
  /* #chart {
    animation: spin 180s infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg);}
    to { transform: rotate(360deg);}
  } */
</style>