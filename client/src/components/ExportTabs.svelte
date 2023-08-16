<script>
	import Tabs from './Tabs.svelte';
	import CodeEditor from './CodeEditor.svelte';
	export let html = '';
	export let css = '';
	export let js = '';

	let svelteCode, reactCode, htmlCode, tabItems;

	$: {
		svelteCode = `<script>\n${js}\n<\/script>\n<style>\n${css}\n<\/style>\n${html}`;
		reactCode = `import React from 'react';\nimport './styles.css';\n\nfunction App() {\n    return (\n        <div>\n            ${html}\n        </div>\n	);\n}\n\nexport default App;`;
		htmlCode = `<!DOCTYPE html>\n<html>\n	<head>\n    	<style>\n        ${css}\n    	<\/style>\n	<\/head>\n	<body>\n		${html}\n		<script>\n		${js}\n		<\/script>\n	<\/body>\n<\/html>`;

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
