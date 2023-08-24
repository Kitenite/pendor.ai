<script lang="ts">
	import { useChat } from 'ai/svelte';
	import { onMount } from 'svelte';
	import Spinner from './Spinner.svelte';
	import AnimatedPlaceholder from './AnimatedPlaceholder.svelte';
	import GenerateButton from './GenerateButton.svelte';
	import mixpanel from '$lib/mixpanel';
	import type { ComponentImpl } from '$lib/models';

	export let component: ComponentImpl;
	export let useTailwindcss = true;
	export let simpleInput = '';
	export let url = '';
	export let isInputUrl = false;
	export let isLoadingValue = false;

	$: simpleInput != '' && handleInputChange();

	const functionCallHandler = async (chatMessages: any, functionCall: any) => {
		if (functionCall.name === 'get_code') {
			if (functionCall.arguments) {
				const parsedFunctionCallArguments = JSON.parse(functionCall.arguments);
				component.html = parsedFunctionCallArguments.html;
				component.css = parsedFunctionCallArguments.css;
				component.js = parsedFunctionCallArguments.js;
				console.log(component);
			}
		}
	};

	onMount(async () => {
		handleInputChange();

		// Automatically trigger form submit if input is pre-filled
		if (simpleInput != '' && $input != '' && !component.isPopulated) {
			triggerFormSubmit();
		}
	});

	const { messages, input, handleSubmit, isLoading } = useChat({
		api: '/api/chat',
		experimental_onFunctionCall: functionCallHandler
	});

	isLoading.subscribe((value) => {
		isLoadingValue = value;
	});

	const isValidUrl = (str = '') => {
		try {
			new URL(str);
		} catch (_) {
			return false;
		}
		return true;
	};

	const handleInputChange = () => {
		isInputUrl = isValidUrl(simpleInput);

		let processedInput;
		if (!component.isPopulated) {
			// Add your logic here for input change
			processedInput = `Create the following component: ${simpleInput}. ${
				useTailwindcss ? 'Use Tailwindcss' : ''
			}}`;
		} else {
			processedInput = `Update the component with this description: ${simpleInput}. ${
				useTailwindcss ? 'Use Tailwindcss. ' : ''
			} Component: ${JSON.stringify({
				html: component.html,
				css: component.css,
				js: component.js
			})}`;
		}

		input.set(processedInput);
	};

	function triggerFormSubmit() {
		// Create a synthetic event object
		const syntheticEvent = {
			target: document.querySelector('form'), // Assuming there's only one form
			preventDefault: () => {} // Mock preventDefault method
		};

		const newQuery = syntheticEvent.target?.query.value || '';
		if (!newQuery) {
			return;
		}

		const isUrl = isValidUrl(newQuery);
		if (isUrl) {
			url = newQuery;
		} else {
			handleSubmit(syntheticEvent);
		}

		mixpanel.track('Send chat', {
			query: syntheticEvent.target?.query.value,
			editing: component.isPopulated
		});
	}
</script>

<main class="w-full px-10 max-w-screen-md">
	<form
		on:submit={triggerFormSubmit}
		class="flex flex-grow m-4 items-center bg-gray-100 rounded-xl p-1.5"
	>
		<AnimatedPlaceholder bind:input={simpleInput} {handleInputChange} />
		{#if isLoadingValue}
			<Spinner />
		{:else}
			<GenerateButton buttonClassOverride="py-2" {isInputUrl} isEditing={component.isPopulated} />
		{/if}
	</form>
</main>
