<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';

	let iframe;
	let url = '';

	function updateIFrame() {
		url = 'https://tailwindcss.com';
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
	<input
		class="border-2 border-blue-500 rounded-md p-2 m-4"
		type="text"
		bind:value={url}
		on:input={updateIFrame}
		placeholder="Describe your component"
	/>
	<p class="m-2 text-lg font-bold">Browser</p>

	<div class="border-2 rounded grow m-10">
		<iframe bind:this={iframe} title="preview" sandbox="" width="100%" height="100%" />
	</div>
</main>
