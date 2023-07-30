<script>
	import ComponentsViewer from '../../components/ComponentsViewer.svelte';
	import Header from '../../components/Header.svelte';

	const handleComponentClick = (e) => {
		console.log(e);
		e.preventDefault();
		e.stopPropagation();
	};
</script>

<main class="flex flex-col">
	<Header />
	<ComponentsViewer />
</main>
