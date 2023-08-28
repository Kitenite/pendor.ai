<script lang="ts">
	import type { ProjectImpl } from '$lib/models/Project';
	import { activeComponentUuidStore, projectStore } from '$lib/stores/project';
	import { onDestroy, onMount } from 'svelte';

	let project: ProjectImpl;
	let activeComponentUuid: string | undefined;
	$: activeComponent = project?.getComponentByUUID(activeComponentUuid ?? '');

	const unsubscribeProjectStore = projectStore.subscribe((value) => {
		project = value;
	});

	const unsubscribeActiveComponent = activeComponentUuidStore.subscribe((value) => {
		activeComponentUuid = value;
	});

	onMount(() => {});

	onDestroy(() => {
		unsubscribeProjectStore();
		unsubscribeActiveComponent();
	});
</script>

<main>
	{#if activeComponent}
		<div class="bg-slate-700 bg-red w-full h-full m-4">
			<iframe title="iframe" srcdoc={activeComponent.html} class="w-full h-full" />
		</div>
	{/if}
</main>
