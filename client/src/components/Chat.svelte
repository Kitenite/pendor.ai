<script>
	import { useChat } from 'ai/svelte';
	import Spinner from './Spinner.svelte';
	import { onMount } from 'svelte';
	import AnimatedPlaceholder from './AnimatedPlaceholder.svelte';
	import GenerateButton from './GenerateButton.svelte';

	export let html = '';
	export let css = '';
	export let js = '';
	export let useTailwindcss = true;
	export let simpleInput = '';

	const functionCallHandler = async (chatMessages, functionCall) => {
		if (functionCall.name === 'get_code') {
			if (functionCall.arguments) {
				const parsedFunctionCallArguments = JSON.parse(functionCall.arguments);
				html = parsedFunctionCallArguments.html;
				css = parsedFunctionCallArguments.css;
				js = parsedFunctionCallArguments.js;
			}
		}
	};

	onMount(async () => {
		handleInputChange();

		// Automatically trigger form submit if input is pre-filled
		if (simpleInput != '' && $input != '' && html == '' && css == '' && js == '') {
			triggerFormSubmit();
		}
	});

	const { messages, input, handleSubmit, isLoading } = useChat({
		api: '/api/chat',
		experimental_onFunctionCall: functionCallHandler
	});

	let isLoadingValue = false;

	isLoading.subscribe((value) => {
		isLoadingValue = value;
	});

	const handleInputChange = () => {
		let processedInput;
		if (html == '' && css == '' && js == '') {
			// Add your logic here for input change
			processedInput = `Create the following component: ${simpleInput}. ${
				useTailwindcss ? 'Use Tailwindcss' : ''
			}}`;
		} else {
			processedInput = `Update the component with this description: ${simpleInput}. ${
				useTailwindcss ? 'Use Tailwindcss. ' : ''
			} Component: ${JSON.stringify({
				html,
				css,
				js
			})}`;
		}

		input.set(processedInput);
	};

	function triggerFormSubmit() {
		// Create a synthetic event object
		const syntheticEvent = {
			target: document.querySelector('form'), // Assuming there's only one form
			preventDefault: () => {} // Mock preventDefault method
			// Add other properties if needed...
		};

		// Call handleSubmit with the synthetic event
		handleSubmit(syntheticEvent);
	}
</script>

<main class="w-full px-10 max-w-screen-md">
	<form
		on:submit={handleSubmit}
		class="flex flex-grow m-4 items-center bg-gray-100 rounded-xl p-1.5"
	>
		<AnimatedPlaceholder input={simpleInput} {handleInputChange} />
		{#if isLoadingValue}
			<Spinner />
		{:else}
			<GenerateButton buttonClassOverride="py-2" />
			<!-- <label class="inline-flex items-center m-4">
				<input
					type="checkbox"
					bind:checked={useTailwindcss}
					on:change={handleInputChange}
					class="form-checkbox h-5 w-5 text-blue-600"
				/>
				<span class="ml-2 text-gray-700">Use Tailwindcss</span>
			</label> -->
		{/if}
	</form>
</main>
