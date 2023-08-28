<!-- 
	Functionalities
		- Use GPT3.5 to determine function call based on input. 
		 - Create new page
		 - Edit page
		 - Create new component inside page
		 - Edit component inside page
 -->

<script lang="ts">
	import { onMount } from 'svelte';
	import Spinner from '../Spinner.svelte';
	import AnimatedPlaceholder from '../AnimatedPlaceholder.svelte';
	import GenerateButton from '../GenerateButton.svelte';
	import mixpanel from '$lib/mixpanel';
	import { AiService } from '$lib/ai';

	export let inputString = '';
	let aiService = new AiService();

	onMount(async () => {
		aiService.setInputValue(inputString);

		// Automatically trigger form submit if input is pre-filled
		if (inputString != '') {
			triggerFormSubmit();
		}
	});

	function triggerFormSubmit() {
		// Create a synthetic event object
		const syntheticEvent = {
			target: document.querySelector('form'), // Assuming there's only one form
			preventDefault: () => {} // Mock preventDefault method
		};

		const newQuery = syntheticEvent.target?.query.value || '';

		if (newQuery == '') {
			return;
		}

		// TODO: Update synthetic event with hydrated inputString
		// const hydratedInputString = aiService.hydrateInputString(newQuery);

		aiService.handleSubmit(syntheticEvent);

		mixpanel.track('Send chat', {
			query: syntheticEvent.target?.query.value
		});
	}
</script>

<main class="w-full px-10 max-w-screen-md">
	<form
		on:submit={triggerFormSubmit}
		class="flex flex-grow m-4 items-center bg-gray-100 rounded-xl p-1.5"
	>
		<AnimatedPlaceholder bind:input={inputString} />
		{#if aiService.isLoading}
			<Spinner />
		{:else}
			<GenerateButton buttonClassOverride="py-2" />
		{/if}
	</form>
</main>
