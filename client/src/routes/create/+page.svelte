<script>
	import Chat from '../../components/Chat.svelte';
	import Preview from '../../components/Preview.svelte';
	import CodeEditor from '../../components/CodeEditor.svelte';
	import { page } from '$app/stores';
	let html = '';
	let css = '';
	let js = '';

	// Optional query
	const query = $page.url.searchParams.get('query');
	let input = query ?? '';
</script>

<main class="flex flex-col p-4">
	<Chat bind:html bind:css bind:js simpleInput={input} />
	<div class="flex flex-row">
		<div class="w-1/2 m-2">
			<CodeEditor bind:code={html} language="html" filename="sample.html" />
			<CodeEditor bind:code={css} language="css" filename="sample.css" />
		</div>
		<div class="w-1/2 m-2">
			<Preview {html} {css} {js} />
		</div>
	</div>
</main>
