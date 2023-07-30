<script lang="ts">
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import type { Component } from '$lib/models';

	export let html = '';
	export let css = '';
	export let js = '';

	export let showHeader = true;
	export let allowSave = true;
	export let allowScripts = true;

	let iframe;
	let url = '';
	let uuid = '';
	let saving = false;

	// Used to detect content changes
	let prevHtml = html;
	let prevCss = css;
	let prevJs = js;
	let hasContentChanged = true;

	function updateIFrame() {
		const page = `
			<!DOCTYPE html>
			<html lang="en">
				<head>
					<script src="https://cdn.tailwindcss.com"></\script>
					<style>${css || ''}</style>

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
					<script type="text/javascript">${js || ''}</\script>
					${html || ''}
				</body>
			</html>
		`;

		const blob = new Blob([page], { type: 'text/html' });
		url = URL.createObjectURL(blob);
		iframe.src = url;
		uuid = '';
	}

	// Reactively update iframe when content changes
	$: {
		if (html !== prevHtml || css !== prevCss || js !== prevJs) {
			prevHtml = html;
			prevCss = css;
			prevJs = js;
			hasContentChanged = true;
			updateIFrame();
		} else {
			hasContentChanged = false;
		}
	}

	async function uploadComponent() {
		const component: Component = {
			uuid,
			html,
			css,
			js
		};

		const response = await fetch('/api/components/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(component)
		});

		const respData = await response.json();
		uuid = respData.uuid;
		hasContentChanged = false;
	}

	onMount(() => {
		updateIFrame();
	});

	onDestroy(() => {
		URL.revokeObjectURL(url);
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
	{#if allowSave}
		<button
			class="m-2 p-2 rounded-md {hasContentChanged
				? 'bg-blue-500 text-white'
				: 'bg-gray-500 text-gray-300 cursor-not-allowed'}"
			on:click={uploadComponent}
			disabled={!hasContentChanged}
			>{hasContentChanged ? 'Save component' : 'Component saved'}</button
		>
	{/if}
</main>
