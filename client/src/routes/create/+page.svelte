<script>
	import Header from '../../components/Header.svelte';
	import Chat from '../../components/Chat.svelte';
	import Preview from '../../components/Preview.svelte';
	import AllEditors from '../../components/AllEditors.svelte';
	let html = '';
	let css = '';
	let js = '';
</script>

<Header />
<main class="flex flex-col p-4">
	<Chat bind:html bind:css bind:js />
	<div class="flex flex-row">
		<div class="w-1/2 m-2">
			<AllEditors bind:html bind:css bind:js />
		</div>
		<div class="w-1/2 m-2">
			<Preview {html} {css} {js} />
		</div>
	</div>
</main>
