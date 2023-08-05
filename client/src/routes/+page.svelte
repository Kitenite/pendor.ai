<script>
	import { Constants } from '$lib';
	import AnimatedPlaceholder from '../components/AnimatedPlaceholder.svelte';
	import GenerateButton from '../components/GenerateButton.svelte';
	import Header from '../components/Header.svelte';
	// import CameraButton from '../components/CameraButton.svelte';

	const isValidUrl = (str = '') => {
		try {
			new URL(str);
		} catch (_) {
			return false;
		}
		return true;
	};

	const submitForm = (e) => {
		const query = e.target.query.value;
		if (!query) {
			return;
		}

		const isUrl = isValidUrl(query);
		if (isUrl) {
			window.location.href = `${Constants.COLLECT_PAGE}?url=${query}`;
		} else {
			window.location.href = `${Constants.CREATE_PAGE}?query=${query}`;
		}
	};
</script>

<Header />
<main class="h-screen">
	<div class="flex items-center justify-center h-3/4">
		<div class="max-w-prose mx-auto sm:px-6 lg:max-w-7xl lg:px-8 py-6">
			<h1 class="text-4xl font-bold text-center text-gray-900">
				Create web component in a few words <br /> or from other sites
			</h1>
			<p class="mt-2 text-lg text-center leading-7 p-4">
				Describe your design in a few words, or drop in a URL of a website <br /> that inspires you below
			</p>
			<div class="flex flex-row items-center">
				<form
					on:submit={submitForm}
					class="flex flex-grow m-4 items-center border border-black rounded-xl p-1.5"
				>
					<AnimatedPlaceholder />
					<GenerateButton buttonClassOverride="py-3" />
				</form>
				<!-- <CameraButton /> -->
			</div>
		</div>
	</div>

	<!-- <h1 class="text-4xl font-extrabold text-center text-gray-900">How this works</h1>
	<ul class="grid grid-cols-3 gap-4 pl-5 pt-10 text-center">
		<li><strong>Create</strong><br /> Create and edit components with AI</li>
		<li>
			<strong>Collect</strong><br /> Explore and pull in components from other websites
		</li>
		<li>
			<strong>Components</strong><br /> View and edit all your saved components
		</li>
	</ul> -->
</main>
