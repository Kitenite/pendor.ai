<script lang="ts">
	import loader from '@monaco-editor/loader';
	import { onDestroy, onMount, afterUpdate } from 'svelte';
	import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';
	import { v4 as uuidv4 } from 'uuid';
	import type { ComponentImpl } from '$lib/models';

	let editorContainer: HTMLElement;
	let editor: Monaco.editor.IStandaloneCodeEditor;
	let editorInitialized = false;
	let monaco: typeof Monaco;
	let code = '';

	export let component: ComponentImpl;
	export let language = '';
	export let filename = '';
	export let showTitle = true;

	$: if (component) {
		switch (language) {
			case 'html':
				code = component.html;
				break;
			case 'css':
				code = component.css;
				break;
			case 'javascript' || 'js':
				code = component.js;
				break;
			default:
				code = component.html;
		}
	}

	function setComponentCode(code: string) {
		switch (language) {
			case 'html':
				component.html = code;
				break;
			case 'css':
				component.css = code;
				break;
			case 'javascript':
				component.js = code;
				break;
			default:
				component.html = code;
		}
	}

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
				setComponentCode(editor.getValue());
			});
		}
	});

	afterUpdate(() => {
		if (!editorInitialized || !editor) return;
		updateEditorContent(editor, code);
	});

	onDestroy(() => {
		editor?.getModel()?.dispose();
		editor?.dispose();
		editorInitialized = false; // Reset the flag here
	});
</script>

{#if showTitle}
	<p class="m-2 text-md font-bold">{language}</p>
{/if}
<div class="container h-48 border-2 rounded flex-grow" bind:this={editorContainer} />
