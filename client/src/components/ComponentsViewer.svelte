<script lang="ts">
	import type { Component } from '$lib/models';
	import { onMount } from 'svelte';
	import Preview from './Preview.svelte';
	import { writable } from 'svelte/store';
	import CodeEditor from './CodeEditor.svelte';
	import { DomManipulator } from '$lib/dom';

	let componentUuids: string[] = [];
	let components: Component[] = [];
	let activeComponent: Component;

	const isModalOpen = writable(false);

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
		isModalOpen.set(true);
	};
</script>

<main class="grid grid-cols-3">
	{#each components as component, index}
		<div
			class="relative m-4 bg-transparent border-transparent hover:border-blue-500 hover:border-2 transition-colors duration-200 rounded"
		>
			<Preview
				html={component.html}
				css={component.css}
				js={component.js}
				showHeader={false}
				allowSave={false}
			/>
			<button class="absolute inset-0 z-20" on:click={() => showComponentCode(component)} />
		</div>
	{/each}
</main>

<!-- Main modal -->
{#if activeComponent && $isModalOpen}
	<div
		id="defaultModal"
		tabindex="-1"
		class="fixed inset-0 z-50 p-4 overflow-auto max-h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center"
	>
		<div class=" bg-white rounded-lg p-10 min-w-full md:min-w-2xl text-center flex flex-col">
			<h3 class="text-xl font-semibold">Edit component</h3>
			<!-- Modal content -->
			<div class="text-left flex flex-col pt-4">
				<Preview
					html={activeComponent.html}
					css={activeComponent.css}
					js={activeComponent.js}
					showHeader={false}
					allowSave={true}
				/>
				<!-- Modal body -->
				<CodeEditor bind:code={activeComponent.html} language="html" filename="sample.html" />
				<CodeEditor bind:code={activeComponent.css} language="css" filename="sample.css" />
				<!-- Modal footer -->
				<div class="flex justify-end pt-6 space-x-2 border-t border-gray-600">
					<!-- <button
						data-modal-hide="defaultModal"
						type="button"
						class="bg-blue-600 hover:bg-blue-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:ring-blue-300"
					>
						Save
					</button> -->
					<button
						data-modal-hide="defaultModal"
						type="button"
						class="border border-gray-200 hover:bg-gray-100 text-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:ring-blue-300 hover:text-gray-900"
						on:click={() => isModalOpen.set(false)}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
