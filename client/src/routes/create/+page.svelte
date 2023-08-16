<script>
	import { page } from '$app/stores';

	import Chat from '../../components/Chat.svelte';
	import Preview from '../../components/Preview.svelte';
	import CodeEditor from '../../components/CodeEditor.svelte';
	import CreateHeader from '../../components/CreateHeader.svelte';
	import Browser from '../../components/Browser.svelte';
	let html = '';
	let css = '';
	let js = '';
	let url = '';
	let isBrowserLoading = false;

	// Optional query
	const query = $page.url.searchParams.get('query');
	let input = query ?? '';
</script>

<CreateHeader>
	<Chat bind:html bind:css bind:js simpleInput={input} bind:url isLoadingValue={isBrowserLoading} />
</CreateHeader>
<main class="flex flex-row bg-slate-100 w-full h-screen">
	<div class="flex-grow">
		<Browser
			bind:isLoading={isBrowserLoading}
			bind:url
			bind:selectedHtml={html}
			bind:selectedCss={css}
		/>
	</div>
	<div class="flex flex-col bg-white border border-gray-200 p-4">
		<div class=" m-2">
			<Preview bind:html bind:css bind:js />
		</div>
		<div class=" m-2">
			<CodeEditor bind:code={html} language="html" filename="create.html" />
			<CodeEditor bind:code={css} language="css" filename="create.css" />
		</div>
	</div>
</main>
