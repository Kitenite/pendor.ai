<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { ComponentImpl } from '$lib/models/Component';
	import Modal from './Modal.svelte';
	import ExportTabs from './ExportTabs.svelte';
	import mixpanel from '$lib/mixpanel';
	import { DomManipulator } from '$lib/dom';

	export let component: ComponentImpl = new ComponentImpl({});
	export let showHeader = true;
	export let allowSave = true;
	export let allowExport = true;
	export let allowScripts = true;

	let iframe;
	let blobUrl = '';
	let isModalOpen = false;

	// Used to detect content changes
	let prevHtml = component.html;
	let prevCss = component.css;
	let prevJs = component.js;
	let prevPrompt = component.description;
	let hasContentChanged = true;

	function updateIFrame() {
		const page = `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<script src="https://cdn.tailwindcss.com"></\script>
					<style>${component.css || ''}</style>

					<!-- Center content on iframe -->
					<style>
						html, body {
							display: flex;
							justify-content: center;
							align-items: center;
							height: 100%;
							width: 100%;
							margin: 0;
							padding: 0;
						}
					</style>
				</head>
				<body>
					<div id="root"></div>
					<script type="text/javascript">${component.js || ''}</\script>
					${component.html || ''}
				</body>
			</html>
		`;

		const blob = new Blob([page], { type: 'text/html' });
		blobUrl = URL.createObjectURL(blob);
		iframe.src = blobUrl;
	}

	// Reactively update iframe when content changes
	$: {
		if (
			component.html !== prevHtml ||
			component.css !== prevCss ||
			component.js !== prevJs ||
			component.description !== prevPrompt
		) {
			prevHtml = component.html;
			prevCss = component.css;
			prevJs = component.js;
			prevPrompt = component.description;
			hasContentChanged = true;
			updateIFrame();
		} else {
			hasContentChanged = false;
		}
	}

	async function saveComponent() {
		const respData = await DomManipulator.saveComponent(component);
		hasContentChanged = false;
		mixpanel.track('Save component', {});
	}

	function exportComponent() {
		mixpanel.track('Export component', {});
		isModalOpen = true;
	}

	function deleteComponent() {
		mixpanel.track('Delete component', {});
		DomManipulator.deleteComponentByUuid(component.uuid);
	}

	function cleanComponent() {
		mixpanel.track('Clean component', {});
		fetch('/api/components/clean', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ component })
		}).then((response) => {
			response.json().then((data) => {
				component.css = data.cleanedCSS;
			});
		});
	}

	onMount(() => {
		updateIFrame();
	});

	onDestroy(() => {
		URL.revokeObjectURL(blobUrl);
	});
</script>

<main class="flex flex-col h-full">
	{#if showHeader}
		<p class="m-2 text-lg font-bold">Preview</p>
	{/if}
	<div class="border-2 rounded grow">
		<!-- prettier-ignore -->
		<iframe class="" bind:this={iframe} title="preview" sandbox={allowScripts ? "allow-scripts": ""} width="100%" height="100%" ></iframe>
	</div>

	<div class="flex flex-row flex-grow">
		{#if allowSave}
			<button
				class="m-2 p-2 rounded-md flex-grow {hasContentChanged
					? 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
					: 'bg-gray-100 text-gray-300 cursor-not-allowed'}"
				on:click={saveComponent}
				disabled={!hasContentChanged}
			>
				<div class="flex flex-row justify-center text-center items-center">
					<svg
						width="24"
						height="25"
						viewBox="0 0 24 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<mask
							id="mask0_84_50"
							style="mask-type:alpha"
							maskUnits="userSpaceOnUse"
							x="0"
							y="0"
							width="24"
							height="25"
						>
							<rect y="0.5" width="24" height="24" fill="#D9D9D9" />
						</mask>
						<g mask="url(#mask0_84_50)">
							<path
								d="M5 21.5V5.5C5 4.95 5.19583 4.47917 5.5875 4.0875C5.97917 3.69583 6.45 3.5 7 3.5H13V5.5H7V18.45L12 16.3L17 18.45V11.5H19V21.5L12 18.5L5 21.5ZM17 9.5V7.5H15V5.5H17V3.5H19V5.5H21V7.5H19V9.5H17Z"
								fill={hasContentChanged ? 'black' : 'lightgray'}
							/>
						</g>
					</svg>
					<span class="ml-1">
						{hasContentChanged ? 'Save' : 'Saved'}
					</span>
				</div>
			</button>
		{/if}

		{#if allowExport}
			<button
				class="m-2 p-2 rounded-md flex-grow {hasContentChanged
					? 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
					: 'bg-gray-100 text-gray-300 cursor-not-allowed'}"
				on:click={exportComponent}
				disabled={!hasContentChanged}
			>
				<div class="flex flex-row justify-center text-center items-center">
					<span class="ml-1"> Export </span>
				</div>
			</button>
		{/if}

		<!-- TODO: Admin only -->
		{#if false}
			<button
				class="m-2 p-2 rounded-md flex-grow bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
				on:click={deleteComponent}
			>
				<div class="flex flex-row justify-center text-center items-center">
					<span class="">Delete</span>
				</div>
			</button>

			<button
				class="m-2 p-2 rounded-md flex-grow bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
				on:click={cleanComponent}
			>
				<div class="flex flex-row justify-center text-center items-center">
					<span class="">Clean</span>
				</div>
			</button>
		{/if}
	</div>
</main>

<Modal
	bind:isOpen={isModalOpen}
	title="Export component"
	size="large"
	footerButtons={[
		{
			text: 'Close',
			class: 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer',
			action: () => {
				isModalOpen = false;
			}
		}
	]}
	onClose={() => {
		isModalOpen = false;
	}}
>
	{#if isModalOpen}
		<ExportTabs {component} />
	{/if}
</Modal>
