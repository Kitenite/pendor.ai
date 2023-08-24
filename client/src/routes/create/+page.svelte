<script lang="ts">
	import { page } from '$app/stores';
	import mixpanel from '$lib/mixpanel';
	import Chat from '../../components/Chat.svelte';
	import Preview from '../../components/Preview.svelte';
	import CodeEditor from '../../components/CodeEditor.svelte';
	import CreateHeader from '../../components/CreateHeader.svelte';
	import Browser from '../../components/Browser.svelte';
	import { ComponentImpl } from '$lib/models';

	let component: ComponentImpl = new ComponentImpl({});
	let url = '';
	let isBrowserLoading = false;

	// Optional query
	const query = $page.url.searchParams.get('query');
	let input = query ?? '';
	mixpanel.track('Page Viewed', { page: $page.url.pathname });
</script>

<CreateHeader>
	<Chat bind:component simpleInput={input} bind:url isLoadingValue={isBrowserLoading} />
</CreateHeader>
<main class="flex flex-row bg-slate-100 w-full h-screen">
	<div class="flex-grow">
		<Browser bind:isLoading={isBrowserLoading} bind:url bind:selectedComponent={component} />
	</div>
	<div class="flex flex-col bg-white border border-gray-200 p-4">
		<div class=" m-2">
			<Preview bind:component />
		</div>
		<div class=" m-2">
			<span>
				<p class="font-bold">Source</p>
				<textarea
					bind:value={component.prompt}
					class="w-full rounded-lg border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</span>
			<CodeEditor bind:component language="html" filename="create.html" />
			<CodeEditor bind:component language="css" filename="create.css" />
			<CodeEditor bind:component language="javascript" filename="create.js" />
		</div>
	</div>
</main>
