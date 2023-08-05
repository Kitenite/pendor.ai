<script>
	import { page } from '$app/stores';

	import Chat from '../../components/Chat.svelte';
	import Preview from '../../components/Preview.svelte';
	import CodeEditor from '../../components/CodeEditor.svelte';
	import CreateHeader from '../../components/CreateHeader.svelte';
	let html = '';
	let css = '';
	let js = '';

	// Optional query
	const query = $page.url.searchParams.get('query');
	let input = query ?? '';
</script>

<CreateHeader>
	<Chat bind:html bind:css bind:js simpleInput={input} />
</CreateHeader>
<main class="flex flex-col p-4 bg-slate-100">
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
