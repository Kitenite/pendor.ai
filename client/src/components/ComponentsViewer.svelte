<script lang="ts">
	import type { Component } from '$lib/models';
	import { onMount } from 'svelte';
	import Preview from './Preview.svelte';
	import CodeEditor from './CodeEditor.svelte';
	import { DomManipulator } from '$lib/dom';
	import Modal from './Modal.svelte';

	let componentUuids: string[] = [];
	let components: Component[] = [];
	let activeComponent: Component;
	let isModalOpen = false;

	const getComponentsByUuids = async (uuids: string[]) => {
		components = await Promise.all(
			uuids.map(async (uuid) => await DomManipulator.getComponentByUuid(uuid))
		);
	};

	$: if (componentUuids.length > 0) {
		getComponentsByUuids(componentUuids);
	}

	onMount(async () => {
		componentUuids = await DomManipulator.getComponentUuids();
	});

	const showComponentCode = (component: Component) => {
		activeComponent = component;
		isModalOpen = true;
	};
</script>

<main class="grid grid-cols-3">
	{#each components as component, index}
		<div
			class="relative m-4 bg-transparent border-transparent hover:outline-blue-600 hover:outline hover:outline-2 transition-colors duration-200 rounded"
		>
			<Preview
				html={component.html}
				css={component.css}
				js={component.js}
				showHeader={false}
				allowSave={false}
				allowClear={false}
				allowExport={false}
			/>
			<button class="absolute inset-0" on:click={() => showComponentCode(component)} />
		</div>
	{/each}
</main>

<Modal
	bind:isOpen={isModalOpen}
	title="Edit component"
	size="large"
	footerButtons={[
		{
			text: 'Close',
			class: 'bg-gray-200 text-gray-600',
			action: () => {
				isModalOpen = false;
			}
		}
	]}
	onClose={() => {
		isModalOpen = false;
	}}
>
	<Preview
		html={activeComponent?.html}
		css={activeComponent?.css}
		js={activeComponent?.js}
		showHeader={false}
		allowSave={true}
		allowClear={false}
		uuid={activeComponent?.uuid}
	/>
	<CodeEditor bind:code={activeComponent.html} language="html" filename="component-viewer.html" />
	<CodeEditor bind:code={activeComponent.css} language="css" filename="component-viewer.css" />
	<CodeEditor bind:code={activeComponent.js} language="javascript" filename="component-viewer.js" />
</Modal>
