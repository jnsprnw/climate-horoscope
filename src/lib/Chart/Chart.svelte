<script>
  let width;
  let height;

  $: size = Math.min(width, height) - 20;
  $: viewBox = [-width / 2, -height / 2, width, height];
  const houses = ['something', 'something','something', 'something','something', 'something','something', 'something'];
  $: deg_step = 360 / houses.length;
</script>

<div class="w-full h-full absolute top-0 left-0 z-0" bind:clientWidth={width} bind:clientHeight={height}>
  <svg {width} {height} {viewBox}>
    <g id="chart">
    <circle cx={0} cy={0} r={size / 2} class="fill-none stroke-gray-900" />
    <circle cx={0} cy={0} r={size / 2 * 0.9} class="fill-none stroke-gray-900" />
    {#each houses as house, i}
      <g transform={`rotate(${deg_step * i})`}>
        <g transform={`rotate(${deg_step / 2})`}>
        <path d="M{size / 2} 0 L {size / 2 * 0.9} 0" x1={size / 2} x2={size / 2 * 0.9} y1={0} y2={0} class="stroke-1 stroke-gray-900" />
      </g>
        <text class="font-serif" transform={`rotate(90, ${size / 2 * 0.95}, 0)`} dominant-baseline="middle" text-anchor="middle" x={size / 2 * 0.95}>{ house }</text>
      </g>
    {/each}
  </g>
  </svg>
</div>

<style>
  #chart {
    animation: spin 180s infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg);}
    to { transform: rotate(360deg);}
  }
</style>