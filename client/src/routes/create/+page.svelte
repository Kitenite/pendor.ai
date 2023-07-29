<script>
	import Header from '../../components/Header.svelte';
	import Chat from '../../components/Chat.svelte';
	import Preview from '../../components/Preview.svelte';
	import CodeEditor from '../../components/CodeEditor.svelte';
	let html = '';
	let css = '';
	let js = '';
</script>

<Header />
<main class="flex flex-col p-4">
	<Chat bind:html bind:css bind:js />
	<div class="flex flex-row">
		<div class="w-1/2 m-2">
			<CodeEditor bind:code={html} language="html" filename="sample.html" />
			<CodeEditor bind:code={css} language="css" filename="sample.css" />
			<CodeEditor bind:code={js} language="javascript" filename="sample.js" />
		</div>
		<div class="w-1/2 m-2">
			<Preview {html} {css} {js} />
		</div>
	</div>
</main>
