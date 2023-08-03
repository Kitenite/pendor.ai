<script>
	import Browser from '../../components/Browser.svelte';
	import { page } from '$app/stores';

	// Optional query
	const query = $page.url.searchParams.get('url');
	let input = query ?? '';
</script>

<main class="flex flex-col">
	<Browser url={input} />
</main>
