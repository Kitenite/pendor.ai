<script lang="ts">
	import type { Component, ComponentImpl } from '$lib/models';
	import { onMount } from 'svelte';
	import Preview from './Preview.svelte';
	import CodeEditor from './CodeEditor.svelte';
	import { DomManipulator } from '$lib/dom';
	import Modal from './Modal.svelte';

	let componentUuids: string[] = [];
	let components: ComponentImpl[] = [];
	let activeComponent: ComponentImpl;
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

	const showComponentCode = (component: ComponentImpl) => {
		activeComponent = component;
		isModalOpen = true;
	};
</script>

<main class="grid grid-cols-3">
	{#each components as component, index}
		<div
			class="relative m-4 bg-transparent border-transparent hover:outline-blue-600 hover:outline hover:outline-2 transition-colors duration-200 rounded"
		>
			<Preview {component} showHeader={false} allowSave={false} allowExport={false} />
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
	<Preview component={activeComponent} showHeader={false} allowSave={true} />
	<span>
		<p class="font-bold">Source</p>
		<textarea
			bind:value={activeComponent.prompt}
			class="w-full rounded-lg border-gray-300 border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
	</span>
	<CodeEditor bind:component={activeComponent} language="html" filename="component-viewer.html" />
	<CodeEditor bind:component={activeComponent} language="css" filename="component-viewer.css" />
	<CodeEditor
		bind:component={activeComponent}
		language="javascript"
		filename="component-viewer.js"
	/>
</Modal>
