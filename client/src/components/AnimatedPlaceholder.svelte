<script>
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let input = '';
	export let handleInputChange = () => {};
	export let classOverload = '';

	let placeholders = [
		'A chat UI with blue text bubbles...',
		'https://tailwindcss.com/',
		'Rounded corner input with pink shadow...',
		'https://stackoverflow.com/'
	];

	let currentPlaceholderIndex = 0;
	let currentPlaceholder = placeholders[currentPlaceholderIndex];

	onMount(() => {
		const interval = setInterval(() => {
			currentPlaceholderIndex = (currentPlaceholderIndex + 1) % placeholders.length;
			currentPlaceholder = placeholders[currentPlaceholderIndex];
		}, 3000); // Change every 3 seconds

		return () => clearInterval(interval); // Cleanup on component destroy
	});
</script>

<input
	bind:value={input}
	on:input={handleInputChange}
	transition:slide
	name="query"
	type="text"
	class={`w-full py-2 px-4 outline-none font-semibold bg-transparent ${classOverload}`}
	placeholder={currentPlaceholder}
/>
