<script>
	import ComponentsViewer from '../../components/ComponentsViewer.svelte';
	import Header from '../../components/Header.svelte';
</script>

<main class="flex flex-col">
	<Header />
	<h1 class="text-center font-bold text-4xl pt-10">Browse components</h1>
	<h1 class="text-center text-lg p-5">
		These components are generated under permissive license by the community
	</h1>
	<ComponentsViewer />
</main>
