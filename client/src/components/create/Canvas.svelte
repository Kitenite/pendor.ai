<script lang="ts">
	import { ProjectRenderer } from '$lib/components/renderer';
	import type { ProjectImpl } from '$lib/models/Project';
	import { projectStore } from '$lib/stores/project';
	import { onDestroy, onMount } from 'svelte';

	let project: ProjectImpl;
	let renderedPages: string[] = [];

	const unsubscribe = projectStore.subscribe((value) => {
		project = value;
	});

	onMount(() => {
		renderedPages = new ProjectRenderer(project).renderAllPages();
		console.log(renderedPages);
	});

	onDestroy(unsubscribe);
</script>

<main class="">
	<h1>{project.title}</h1>
	<p>{project.description}</p>
	<div class="flex flex-row">
		{#each renderedPages as page}
			<div class="bg-slate-700 bg-red w-full h-full m-4">
				<iframe title="iframe" srcdoc={page} class="w-full h-full" />
			</div>
		{/each}
	</div>
</main>
