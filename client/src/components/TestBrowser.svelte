<script>
	import { onMount } from 'svelte';
	import Preview from './Preview.svelte';

	let url = 'https://tailwindcss.com/';
	let content = '';

	const getContent = async () => {
		const response = await fetch(`/api/browser?url=${url}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'text/html'
			}
		});
		content = await response.text();
	};

	onMount(() => {
		getContent();
	});
</script>

<h1>Test Browser</h1>
<div>
	{#if content}
		<Preview html={content} />
	{/if}
</div>
