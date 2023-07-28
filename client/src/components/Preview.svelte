<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';

	export let html = '';
	export let css = '';
	export let js = '';

	let iframe;
	let url = '';

	console.log(html, css, js);

	function updateIFrame() {
		const page = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <script src="https://cdn.tailwindcss.com"></\script>
          <style>${css || ''}</style>
        </head>
        <body>
          <div id="root" style="padding: 16px;"></div>
          <script type="text/javascript">${js || ''}</\script>
          ${html || ''}
        </body>
      </html>
    `;

		const blob = new Blob([page], { type: 'text/html' });
		url = URL.createObjectURL(blob);

		iframe.src = url;
	}

	onMount(() => {
		updateIFrame();
	});

	afterUpdate(() => {
		updateIFrame();
	});

	onDestroy(() => {
		URL.revokeObjectURL(url);
	});
</script>

<main class="flex flex-col h-full">
	<p class="m-2 text-lg font-bold">Preview</p>
	<div class="border-2 rounded grow">
		<iframe bind:this={iframe} title="preview" sandbox="allow-scripts" width="100%" height="100%" />
	</div>
</main>
