# Svelte + Vite

This template should help get you started developing with Svelte in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Need an official Svelte framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why use this over SvelteKit?**

- It brings its own routing solution which might not be preferable for some users.
- It is first and foremost a framework that just happens to use Vite under the hood, not a Vite app.

This template contains as little as possible to get started with Vite + Svelte, while taking into account the developer experience with regards to HMR and intellisense. It demonstrates capabilities on par with the other `create-vite` templates and is a good starting point for beginners dipping their toes into a Vite + Svelte project.

Should you later need the extended capabilities and extensibility provided by SvelteKit, the template has been structured similarly to SvelteKit so that it is easy to migrate.

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Why enable `checkJs` in the JS template?**

It is likely that most cases of changing variable types in runtime are likely to be accidental, rather than deliberate. This provides advanced typechecking out of the box. Should you like to take advantage of the dynamically-typed nature of JavaScript, it is trivial to change the configuration.

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/sveltejs/svelte-hmr/tree/master/packages/svelte-hmr#preservation-of-local-state).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```js
// store.js
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```

## Licenses
- https://github.com/kevquirk/simple.css/blob/main/LICENSE

??:
new svelte kit 5
<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  function globalVarPromise(globalVar) {
    const pred = () => {
      try {
        return window.hasOwnProperty(globalVar);
      } catch (refError) {
        return false;
      }
    }
    return new Promise((resolve, reject) => {
      const check = () => {
        if (!pred()) return;
        clearInterval(interval);
        resolve();
      };
      const interval = setInterval(check, 13);
      check();

      // Leave the following dead code until we want warning for something like
      // unsupported platform (wherever expected global variable doesn't exist).
      // function globalVarPromise(globalVar, timeout) {
      // ...
      // if (!timeout) return;
      // setTimeout(() => {
        // clearInterval(interval);
        // reject();
      // }, timeout);
    });
  }

  function fmt(activity, deal) {
    return `?a=${activity}&d=${deal}`
  }

  // async function parseLocation() {
    // await globalVarPromise('location');
    // const sp = new URLSearchParams(location.search);
    // return {  // activity deal
      // a: sp.get('a'),
      // d: sp.get('d') != 'n',
    // }
  // }
  // let params = parseLocation();

  $: activity = $page.url.searchParams.get('a') || '';
  let deal = $page.url.searchParams.get('d') || '';
  $: dealIsChecked = deal != 'n';

  // ?? ReferrenceError because history isn't available from the beginning

  function copyUrlToClipboard() {
    // Invariant: Reasonable (e.g. non-robot) wait time until interaction.
    navigator.clipboard.writeText(location.href);
  }

  function updateUrl(activity, dealIsChecked) {
    console.log("yaa")
    // ?? latch to copyUrlToClipboard
    //goto("?region")
    goto(`?a=${activity}&a=n`)
  }

  // Update URL of current history entry on params change.
  //$: history.replaceState({}, '', fmt(activity, deal));
  $: updateUrl(activity, dealIsChecked)

</script>

<main>
  <input type="text" bind:value={activity} />

  <label>deal:
    <input
      type="checkbox"
      bind:checked={dealIsChecked}
      xxx="hide checkbox; style label to look like button" />
  </label>
  
  <button on:click={copyUrlToClipboard}>Copy to Clipboard</button>

</main>

<style>
</style>
