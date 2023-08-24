<!-- Modal.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	export let isOpen = false;
	export let onClose: () => void;
	export let title = '';
	export let size = 'medium';
	export let footerButtons = [];

	let modalClass = 'w-screen';

	// Set modal size
	$: {
		if (size === 'small') modalClass = 'w-1/4';
		else if (size === 'medium') modalClass = 'w-1/2';
		else if (size === 'large') modalClass = 'w-3/4';
		else if (size === 'full') modalClass = 'w-screen';
	}

	onMount(() => {
		const closeOnEsc = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};
		window.addEventListener('keydown', closeOnEsc);
		return () => {
			window.removeEventListener('keydown', closeOnEsc);
		};
	});

	// Stop propagation to prevent outer overlay click from closing the modal
	function stopPropagation(event) {
		event.stopPropagation();
	}
</script>

{#if isOpen}
	<div
		tabindex="-1"
		class="fixed inset-0 z-50 p-4 bg-gray-900 bg-opacity-50 flex items-center justify-center"
		on:click={onClose}
	>
		<div
			on:click={stopPropagation}
			class={`max-h-screen overflow-auto bg-white rounded-lg p-10 text-center flex flex-col ${modalClass}`}
		>
			{#if title}
				<h3 class="text-xl font-semibold">{title}</h3>
			{/if}
			<div class="text-left flex flex-col pt-4">
				<slot />
				<!-- Modal footer -->
				{#if footerButtons.length > 0}
					<div class="flex justify-end pt-6 space-x-2 border-t border-gray-600">
						{#each footerButtons as button}
							<button
								class="border border-gray-200 hover:bg-gray-100 text-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:ring-blue-300 hover:text-gray-900 ${button.class}"
								type="button"
								on:click={(e) => {
									e.stopPropagation();
									button.action();
								}}
							>
								{button.text}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
