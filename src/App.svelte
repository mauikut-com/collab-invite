<script>
  function parseLocation() {
    const sp = new URLSearchParams(location.search);
    // activity deal
    return {
      a: sp.get('a'),
      d: sp.get('d') != 'n',
    }
  }
  let params = parseLocation();

  $: activity = params.a;
  $: deal = params.d;

  function fmt(activity, deal) {
    return `?a=${activity}&d=${deal}`;
  }
  $: history.replaceState({}, '', fmt(activity, deal));
  
</script>

<main>
  <input type="text" bind:value={activity} />

  <label>deal:
    <input
      type="checkbox"
      bind:checked={deal}
      xxx="hide checkbox; style label to look like button" />
  </label>

</main>

<style>
</style>
