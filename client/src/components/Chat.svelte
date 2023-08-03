<script>
	import { useChat } from 'ai/svelte';
	import Spinner from './Spinner.svelte';
	import { onMount } from 'svelte';

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
</script>

<main>
	<form on:submit={handleSubmit} class="flex flex-row items-center">
		<input
			class="border-2 border-blue-500 rounded-md p-2 m-4 w-1/2"
			type="text"
			bind:value={simpleInput}
			on:input={handleInputChange}
			placeholder="Describe your component"
			disabled={isLoadingValue}
		/>
		{#if isLoadingValue}
			<Spinner />
		{:else}
			<button
				type="submit"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>Generate</button
			>
			<label class="inline-flex items-center m-4">
				<input
					type="checkbox"
					bind:checked={useTailwindcss}
					on:change={handleInputChange}
					class="form-checkbox h-5 w-5 text-blue-600"
				/>
				<span class="ml-2 text-gray-700">Use Tailwindcss</span>
			</label>
		{/if}
	</form>
</main>
