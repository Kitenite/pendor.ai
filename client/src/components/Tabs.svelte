<script lang="ts">
	export let items: any[] = [];
	export let activeTabValue = 1;

	const handleClick = (tabValue: number) => () => (activeTabValue = tabValue);
</script>

<ul class="flex flex-wrap list-none mb-0">
	{#each items as item}
		<li class={activeTabValue === item.value ? 'mb-[-1px]' : ''}>
			<span
				on:click={handleClick(item.value)}
				class="block py-2 px-4 rounded-t-md cursor-pointer hover:bg-gray-100 {activeTabValue ===
				item.value
					? 'font-semibold text-gray-700 bg-white border-b-4 border-gray-400'
					: 'text-gray-500 bg-transparent border-b-2 border-gray-300'}"
			>
				{item.label}
			</span>
		</li>
	{/each}
</ul>
{#each items as item}
	{#if activeTabValue == item.value}
		<div class="mb-2 p-10">
			<svelte:component this={item.component} {...item.props} />
		</div>
	{/if}
{/each}
