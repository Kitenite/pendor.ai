<script>
	import { onMount, onDestroy } from 'svelte';
	import Spinner from './Spinner.svelte';
	import Preview from './Preview.svelte';
	import CodeEditor from './CodeEditor.svelte';
	import { Constants } from '$lib';

	let iframe;
	let url = 'https://stackoverflow.com/';
	let isLoading = false;
	let selectedHtml = '';
	let selectedCss = '';

	onMount(() => {
		window.addEventListener(
			'message',
			function (event) {
				if (event.data.type === Constants.CLICK_IDENTIFIER) {
					selectedHtml = event.data.html;
					selectedCss = event.data.css;
				}
			},
			false
		);

		updateIFrame();
	});

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
	<div class="flex flex-row">
		<div class="w-1/2 m-2 flex-col">
			<CodeEditor bind:code={selectedHtml} language="html" filename="sample.html" />
			<CodeEditor bind:code={selectedCss} language="css" filename="sample.css" />
		</div>
		<div class="w-1/2 m-2">
			<Preview html={selectedHtml} js={''} css={selectedCss} />
		</div>
	</div>

	<p class="m-2 text-lg font-bold">Browser</p>

	<div class="border-2 rounded h-screen m-10">
		<!-- prettier-ignore -->
		<iframe 
			bind:this={iframe} 
			title="preview" 
			sandbox="allow-scripts allow-same-origin" 
			scrolling="auto"
			width="100%" 
			height="100%"
		></iframe>
	</div>
</main>
