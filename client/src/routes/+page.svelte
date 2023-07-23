<script>
	import Chat from '../components/Chat.svelte';
	import CodeEditor from '../components/CodeEditor.svelte';
	import Preview from '../components/Preview.svelte';
	let html = '';
	let css = '';
	let js = '';
</script>

<Chat bind:html bind:css bind:js />
<CodeEditor bind:html bind:css bind:js />
<Preview {html} {css} {js} />
