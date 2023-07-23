<script lang="ts">
	import loader from '@monaco-editor/loader';
	import { onDestroy, onMount, afterUpdate } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

	let htmlEditorContainer: HTMLElement;
	let cssEditorContainer: HTMLElement;
	let jsEditorContainer: HTMLElement;

	let monaco: typeof Monaco;
	let htmlEditor: Monaco.editor.IStandaloneCodeEditor;
	let cssEditor: Monaco.editor.IStandaloneCodeEditor;
	let jsEditor: Monaco.editor.IStandaloneCodeEditor;

	export let html = '';
	export let css = '';
	export let js = '';

	async function createEditor(
		container: HTMLElement,
		code: string,
		language: string,
		filename: string
	) {
		const editor = monaco.editor.create(container);
		const model = monaco.editor.createModel(code, language, monaco.Uri.file(filename));
		editor.setModel(model);

		return editor;
	}

	async function updateEditorContent(editor: Monaco.editor.IStandaloneCodeEditor, code: string) {
		const model = editor.getModel();
		if (model) {
			const currentValue = model.getValue();
			if (currentValue !== code) {
				model.setValue(code);
			}
		}
	}

	onMount(async () => {
		const monacoEditor = await import('monaco-editor');
		loader.config({ monaco: monacoEditor.default });

		monaco = await loader.init();

		htmlEditor = await createEditor(htmlEditorContainer, html, 'html', 'sample.html');
		cssEditor = await createEditor(cssEditorContainer, css, 'css', 'sample.css');
		jsEditor = await createEditor(jsEditorContainer, js, 'javascript', 'sample.js');

		htmlEditor.onDidChangeModelContent(() => {
			html = htmlEditor.getValue();
		});

		cssEditor.onDidChangeModelContent(() => {
			css = cssEditor.getValue();
		});

		jsEditor.onDidChangeModelContent(() => {
			js = jsEditor.getValue();
		});
	});

	afterUpdate(() => {
		if (!monaco) return;
		updateEditorContent(htmlEditor, html);
		updateEditorContent(cssEditor, css);
		updateEditorContent(jsEditor, js);
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		htmlEditor?.dispose();
		cssEditor?.dispose();
		jsEditor?.dispose();
	});
</script>

<div>
	<div>html</div>
	<div class="container" bind:this={htmlEditorContainer} />
	<div>css</div>
	<div class="container" bind:this={cssEditorContainer} />
	<div>js</div>
	<div class="container" bind:this={jsEditorContainer} />
</div>

<style>
	.container {
		width: 100%;
		height: 200px;
		margin-bottom: 10px;
	}
</style>
