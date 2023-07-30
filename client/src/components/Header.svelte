<script>
	import { page } from '$app/stores';
	import { Constants } from '$lib';
</script>

<header class="py-4">
	<nav class="container mx-auto flex justify-between items-center">
		<a href="/" class="font-bold text-xl">Ged</a>
		<div>
			<a
				href={Constants.CREATE_PAGE}
				class="mx-2 {$page.url.pathname == Constants.CREATE_PAGE ? 'font-bold' : ''}">Create</a
			>
			<a
				href={Constants.COLLECT_PAGE}
				class="mx-2 {$page.url.pathname == Constants.COLLECT_PAGE ? 'font-bold' : ''}">Collect</a
			><a
				href={Constants.COMPONENTS_PAGE}
				class="mx-2 {$page.url.pathname == Constants.COMPONENTS_PAGE ? 'font-bold' : ''}"
				>Components</a
			>
		</div>
	</nav>
</header>
