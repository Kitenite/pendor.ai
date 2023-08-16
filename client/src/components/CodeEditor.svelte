<script lang="ts">
	import loader from '@monaco-editor/loader';
	import { onDestroy, onMount, afterUpdate } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
	import { v4 as uuidv4 } from 'uuid';

	let editorContainer: HTMLElement;
	let editor: Monaco.editor.IStandaloneCodeEditor;
	let editorInitialized = false;

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
		console.log('mounting');

		if (!editorContainer) return; // Avoid creating the editor if the container isn't available

		filename = `${uuidv4()}-${filename}`; // Generate a random filename if none is provided
		const monacoEditor = await import('monaco-editor');
		loader.config({ monaco: monacoEditor.default });
		monaco = await loader.init();

		// Avoid recreating the editor if it already exists
		if (!editor) {
			editor = await createEditor(editorContainer, code, language, filename);
			editorInitialized = true; // Set the flag here
			editor.onDidChangeModelContent(() => {
				code = editor.getValue();
			});
		}
	});

	afterUpdate(() => {
		if (!editorInitialized || !editor) return;
		updateEditorContent(editor, code);
	});

	onDestroy(() => {
		console.log('destroying');
		editor?.getModel()?.dispose();
		editor?.dispose();
		editorInitialized = false; // Reset the flag here
		editor = null; // Clear the editor reference
	});
</script>

{#if showTitle}
	<p class="m-2 text-md font-bold">{language}</p>
{/if}
<div class="container h-48 border-2 rounded flex-grow" bind:this={editorContainer} />
