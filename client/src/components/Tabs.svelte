<script>
	export let items = [];
	export let activeTabValue = 1;

	const handleClick = (tabValue) => () => (activeTabValue = tabValue);
</script>

<ul class="flex flex-wrap list-none mb-0 border-b border-gray-300">
	{#each items as item}
		<li class={activeTabValue === item.value ? 'mb-[-1px]' : ''}>
			<span
				on:click={handleClick(item.value)}
				class="block py-2 px-4 border border-transparent rounded-t-md cursor-pointer hover:border-gray-200 {activeTabValue ===
				item.value
					? 'text-gray-700 bg-white border-b-0 border-gray-300'
					: ''}"
			>
				{item.label}
			</span>
		</li>
	{/each}
</ul>
{#each items as item}
	{#if activeTabValue == item.value}
		<div class="mb-2 p-10 border border-t-0 border-gray-300 rounded-b-md">
			<svelte:component this={item.component} {...item.props} />
		</div>
	{/if}
{/each}
