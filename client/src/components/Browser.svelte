<script>
	import { onMount } from 'svelte';
	import { Constants } from '$lib';
	import mixpanel from '$lib/mixpanel';

	export let url = '';
	export let isLoading = false;
	export let selectedHtml = '';
	export let selectedCss = '';
	let iframe;

	$: url != '' && updateIFrame();

	onMount(() => {
		window.addEventListener(
			'message',
			function (event) {
				if (event.data.type === Constants.CLICK_IDENTIFIER) {
					selectedHtml = event.data.html;
					selectedCss = event.data.css;
				}
				mixpanel.track('Select from browser', {});
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
