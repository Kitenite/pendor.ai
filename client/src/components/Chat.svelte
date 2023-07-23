<script>
	import { useChat } from 'ai/svelte';

	export let html = '';
	export let css = '';
	export let js = '';
	export let useTailwindcss = false;
	let simpleInput = '';

	const functionCallHandler = async (chatMessages, functionCall) => {
		if (functionCall.name === 'get_code') {
			if (functionCall.arguments) {
				const parsedFunctionCallArguments = JSON.parse(functionCall.arguments);
				console.log(parsedFunctionCallArguments);
				html = parsedFunctionCallArguments.html;
				css = parsedFunctionCallArguments.css;
				js = parsedFunctionCallArguments.js;
			}
		}
	};

	const { messages, input, handleSubmit } = useChat({
		api: '/api/completion',
		experimental_onFunctionCall: functionCallHandler
	});

	const handleInputChange = (event) => {
		// Add your logic here for input change
		const processedInput = `Create the following component: ${simpleInput}. ${
			useTailwindcss ? 'Use Tailwindcss' : ''
		}}`;
		input.set(processedInput);
		console.log($input);
	};
</script>

<main>
	<form on:submit={handleSubmit}>
		<input
			type="text"
			bind:value={simpleInput}
			on:input={handleInputChange}
			placeholder="Describe your component"
		/>
		<button type="submit">Generate</button>
		<label>
			<input type="checkbox" bind:checked={useTailwindcss} on:change={handleInputChange} />
			Use Tailwindcss
		</label>
	</form>
</main>
