<script>
	import CodeEditor from './CodeEditor.svelte';

	export let html = '';
	export let css = '';
	export let js = '';
</script>

<div>
	<p class="m-2 text-lg font-bold">html</p>
	<CodeEditor bind:code={html} language="html" filename="sample.html" />

	<p class="m-2 text-lg font-bold">css</p>
	<CodeEditor bind:code={css} language="css" filename="sample.css" />

	<p class="m-2 text-lg font-bold">js</p>
	<CodeEditor bind:code={js} language="javascript" filename="sample.js" />
</div>
