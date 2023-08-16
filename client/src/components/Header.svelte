<script>
	import { page } from '$app/stores';
	import { Constants } from '$lib';
	import Logo from './Logo.svelte';

	let signedIn = true;

	const logIn = () => {
		signedIn = true;
	};
</script>

<header class="p-4">
	<nav class="container mx-auto flex justify-between items-center h-10">
		<Logo />
		{#if signedIn}
			<div>
				<a
					href={Constants.CREATE_PAGE}
					class="mx-2 {$page.url.pathname == Constants.CREATE_PAGE ? 'font-bold' : ''}">Create</a
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
