<script>
	import { page } from '$app/stores';
	import { CREATE_PAGE, COLLECT_PAGE } from '$lib';
</script>

<header class="py-4">
	<nav class="container mx-auto flex justify-between items-center">
		<a href="/" class="font-bold text-xl">Ged</a>
		<div>
			<a href={CREATE_PAGE} class="mx-2 {$page.url.pathname == CREATE_PAGE ? 'font-bold' : ''}"
				>Create</a
			>
			<a href={COLLECT_PAGE} class="mx-2 {$page.url.pathname == COLLECT_PAGE ? 'font-bold' : ''}"
				>Collect</a
			>
		</div>
	</nav>
</header>
