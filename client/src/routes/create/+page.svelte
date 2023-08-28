<script lang="ts">
	import { page } from '$app/stores';
	import mixpanel from '$lib/mixpanel';
	import ChatInput from '../../components/create/ChatInput.svelte';
	import CreateHeader from '../../components/CreateHeader.svelte';
	import Canvas from '../../components/create/Canvas.svelte';
	import EditSideBar from '../../components/create/EditSideBar.svelte';
	import { onMount } from 'svelte';
	import { projectStore } from '$lib/stores/project';
	import { ProjectImpl } from '$lib/models/Project';

	export let data;
	// Optional query provided from link. Mya pass into chat input
	const providedInput = $page.url.searchParams.get('query') ?? '';

	// Resizing with drag
	let isDragging = false;
	let lastX = 0;
	function startResize(event: MouseEvent) {
		isDragging = true;
		lastX = event.clientX;
	}

	function resizing(event: MouseEvent) {
		if (isDragging) {
			const dx = event.clientX - lastX;
			const rightDiv = document.querySelector('.right-resizable');
			if (rightDiv) {
				const width = rightDiv.getBoundingClientRect().width - dx;
				rightDiv.style.width = `${width}px`;
			}
			lastX = event.clientX;
		}
	}

	function stopResize() {
		isDragging = false;
	}

	onMount(() => {
		console.log(data);
		projectStore.set(new ProjectImpl(data.project));
		mixpanel.track('Page Viewed', { page: $page.url.pathname });
	});
</script>

<CreateHeader>
	<ChatInput inputString={providedInput} />
</CreateHeader>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main
	class="flex flex-row bg-slate-100 w-full h-screen"
	on:mousemove={resizing}
	on:mouseup={stopResize}
	on:mouseleave={stopResize}
>
	<div class="w-3/4 min-w-3/4 flex-grow overflow-x-hidden max-w-full">
		<div class=" w-full h-full">
			<Canvas />
		</div>
	</div>

	<!-- Resizable divider -->
	<div role="separator" class="divider cursor-ew-resize p-1" on:mousedown={startResize} />

	<div class="w-1/4 bg-white border border-gray-200 max-w-sm right-resizable">
		<div class="w-full h-full">
			<EditSideBar />
		</div>
	</div>
</main>
