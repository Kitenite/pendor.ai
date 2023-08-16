<script>
	import CodeEditor from './CodeEditor.svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';

	export let html = '';
	export let css = '';
	export let js = '';

	let svelteCode = `<script>\n${js}\n<\/script>\n<style>\n${css}\n<\/style>\n${html}`;
	let reactCode = `import React from 'react';\nimport './styles.css';\n\nfunction App() {\n    return (\n        <div>\n            ${html}\n        </div>\n	);\n}\n\nexport default App;`;

	let htmlCode = `<!DOCTYPE html>\n<html>\n	<head>\n    	<style>\n        ${css}\n    	<\/style>\n	<\/head>\n	<body>\n		${html}\n		<script>\n		${js}\n		<\/script>\n	<\/body>\n<\/html>`;
</script>

<Tabs>
	<TabItem open title="Svelte">
		<CodeEditor code={svelteCode} language="html" filename="sample.html" showTitle={false} />
	</TabItem>
	<TabItem title="React">
		<CodeEditor code={reactCode} language="javascript" filename="sample.js" showTitle={false} />
	</TabItem>
	<TabItem title="HTML">
		<CodeEditor code={htmlCode} language="html" filename="sample.html" showTitle={false} />
	</TabItem>
</Tabs>
