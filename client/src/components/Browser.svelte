<script>
	import { onMount } from 'svelte';
	import Spinner from './Spinner.svelte';

	let iframe;
	let url = '';
	let isLoading = false;

	const updateIFrame = async () => {
		if (url === '') {
			return;
		}

		const promise = fetch(`/api/browser?url=${url}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'text/html'
			}
		});
		isLoading = true;

		const response = await promise;
		const page = await response.text();
		const blob = new Blob([page], { type: 'text/html' });
		iframe.src = URL.createObjectURL(blob);
		isLoading = false;
	};

	onMount(() => {
		updateIFrame();
	});
</script>

<main class="flex flex-col h-full">
	<form on:submit={updateIFrame} class="flex flex-row items-center">
		<input
			class="border-2 border-blue-500 rounded-md p-2 m-4 w-1/2"
			type="text"
			bind:value={url}
			placeholder="Paste a URL"
			disabled={isLoading}
		/>
		{#if isLoading}
			<Spinner />
		{:else}
			<button
				type="submit"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>Get Content</button
			>
		{/if}
	</form>

	<p class="m-2 text-lg font-bold">Browser</p>

	<div class="border-2 rounded grow m-10">
		<iframe bind:this={iframe} title="preview" sandbox="" width="100%" height="100%" />
	</div>
</main>
