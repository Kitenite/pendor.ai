<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';

	export let html = '';
	export let css = '';
	export let js = '';

	let iframe;
	let url = '';
	let uuid = '';

	function updateIFrame() {
		const page = `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<script src="https://cdn.tailwindcss.com"></\script>
					<style>${css || ''}</style>

					<!-- Center content on iframe -->
					<style>
						html, body {
							display: flex;
							justify-content: center;
							align-items: center;
							height: 100%;
							margin: 0;
							padding: 0;
						}
					</style>
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
		uuid = '';
		iframe.src = url;
	}

	async function uploadComponent() {
		const component = {
			html,
			css,
			js
		};

		const response = await fetch('/api/files', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data: JSON.stringify(component), uuid })
		});

		const respData = await response.json();
		uuid = respData.uuid;
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
		<!-- prettier-ignore -->
		<iframe bind:this={iframe} title="preview" sandbox="allow-scripts" width="100%" height="100%"></iframe>
	</div>
	<button class="m-2 p-2 bg-blue-500 text-white rounded-md" on:click={uploadComponent}
		>Save component</button
	>
</main>
