<!-- Modal.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	export let isOpen = false;
	export let onClose: () => void;
	export let title = '';
	export let size = 'medium';
	export let footerButtons = [];

	let modalClass = '';

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
</script>

{#if isOpen}
	<button
		tabindex="-1"
		class="fixed inset-0 z-50 p-4 overflow-auto max-h-screen bg-gray-900 bg-opacity-50 flex items-center justify-center"
		on:click={onClose}
	>
		<div
			class={`bg-white rounded-lg p-10 text-center flex flex-col ${modalClass}`}
			on:click={(e) => e.stopPropagation()}
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
							<button type="button" class={button.class} on:click={button.action}>
								{button.text}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</button>
{/if}
