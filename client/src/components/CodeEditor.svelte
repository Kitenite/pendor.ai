<script lang="ts">
	import loader from '@monaco-editor/loader';
	import { onDestroy, onMount, afterUpdate } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

	let editorContainer: HTMLElement;
	let editor: Monaco.editor.IStandaloneCodeEditor;

	let monaco: typeof Monaco;

	export let code = '';
	export let language = '';
	export let filename = '';
	export let showTitle = true;

	async function createEditor(
		container: HTMLElement,
		code: string,
		language: string,
		filename: string
	) {
		const editor = monaco.editor.create(container);
		const model = monaco.editor.createModel(code, language, monaco.Uri.file(filename));
		editor.setModel(model);

		// Prettify on model change originated by the user
		editor.onDidChangeModelContent(() => {
			editor.getAction('editor.action.formatDocument')?.run();
		});

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
		editor = await createEditor(editorContainer, code, language, filename);
		editor.onDidChangeModelContent(() => {
			code = editor.getValue();
		});
	});

	afterUpdate(() => {
		if (!monaco) return;
		updateEditorContent(editor, code);
	});

	onDestroy(() => {
		monaco?.editor.getModels().forEach((model) => model.dispose());
		editor?.dispose();
	});
</script>

{#if showTitle}
	<p class="m-2 text-md font-bold">{language}</p>
{/if}
<div class="container h-48 border-2 rounded flex-grow" bind:this={editorContainer} />
