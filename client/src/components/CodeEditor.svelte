<script lang="ts">
  import loader from '@monaco-editor/loader';
  import { onDestroy, onMount } from 'svelte';
  import type * as Monaco from 'monaco-editor/esm/vs/editor/editor.api';

  let editor: Monaco.editor.IStandaloneCodeEditor;
  let monaco: typeof Monaco;
  let editorContainer: HTMLElement;

  onMount(async () => {

      // Remove the next two lines to load the monaco editor from a CDN
      // see https://www.npmjs.com/package/@monaco-editor/loader#config
      const monacoEditor = await import('monaco-editor');
      loader.config({ monaco: monacoEditor.default });

      monaco = await loader.init();

      // Your monaco instance is ready, let's display some code!
      const editor = monaco.editor.create(editorContainer);
      const model = monaco.editor.createModel(
          "console.log('Hello from Monaco! (the editor, not the city...)')",
          undefined,
          // Give monaco a hint which syntax highlighting to use
          monaco.Uri.file('sample.js')
      );
      editor.setModel(model);
  });

  onDestroy(() => {
      monaco?.editor.getModels().forEach((model) => model.dispose());
  });
</script>

<div>
  <div class="container" bind:this={editorContainer} />
</div>

<style>
  .container {
      width: 100%;
      height: 600px;
  }
</style>