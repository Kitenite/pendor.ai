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
				? 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
				: 'bg-gray-100 text-gray-300 cursor-not-allowed'}"
			on:click={uploadComponent}
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
</main>
