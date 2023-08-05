<script>
	import { page } from '$app/stores';
	import { Constants } from '$lib';

	let signedIn = true;

	const logIn = () => {
		signedIn = true;
	};
</script>

<header class="py-4">
	<nav class="container mx-auto flex justify-between items-center h-10">
		<a href="/" class="flex flex-row items-center">
			<div class="w-5 h-5 rounded-full bg-black">
				<i class="fas fa-circle text-white" />
			</div>
			<p class="font-bold text-xl ml-2">GED</p>
		</a>
		{#if signedIn}
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
		{:else}
			<div>
				<button on:click={logIn} class="mx-2 font-semibold">Log in</button>
				<button on:click={logIn} class="px-4 py-3 ml-3 rounded-lg bg-black text-white font-semibold"
					>Create account</button
				>
			</div>
		{/if}
	</nav>
</header>
