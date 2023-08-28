<script lang="ts">
	import Tabs from './Tabs.svelte';
	import CodeEditor from './CodeEditor.svelte';
	import { ComponentImpl } from '$lib/models/Component';
	export let component: ComponentImpl = new ComponentImpl({});

	let svelteCode, reactCode, htmlCode, tabItems: any[];

	$: {
		svelteCode = `<script>\n${component.js}\n<\/script>\n<style>\n${component.css}\n<\/style>\n${component.html}`;
		reactCode = `import React from 'react';\nimport './styles.css';\n\nfunction App() {\n    return (\n        <div>\n            ${html}\n        </div>\n	);\n}\n\nexport default App;`;
		htmlCode = `<!DOCTYPE html>\n<html>\n	<head>\n    	<style>\n        ${component.css}\n    	<\/style>\n	<\/head>\n	<body>\n		${html}\n		<script>\n		${js}\n		<\/script>\n	<\/body>\n<\/html>`;

		tabItems = [
			{
				label: 'Svelte',
				value: 1,
				component: CodeEditor,
				props: {
					code: svelteCode,
					language: 'html',
					filename: 'export-svelte.html',
					showTitle: false
				}
			},
			{
				label: 'React',
				value: 2,
				component: CodeEditor,
				props: {
					code: reactCode,
					language: 'javascript',
					filename: 'export-react.js',
					showTitle: false
				}
			},
			{
				label: 'HTML',
				value: 3,
				component: CodeEditor,
				props: {
					code: htmlCode,
					language: 'html',
					filename: 'export-html.html',
					showTitle: false
				}
			}
		];
	}
</script>

<Tabs bind:items={tabItems} />
