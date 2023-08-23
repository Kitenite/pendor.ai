<script>
	import mixpanel from '$lib/mixpanel';
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
		window.location.href = `${Constants.CREATE_PAGE}?query=${query}`;
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

	<h1 class="text-4xl font-semibold text-center text-gray-900">How this works</h1>
	<ul class="h-1/2 grid grid-cols-3 gap-12 pl-5 pt-10 text-center">
		<li class="flex flex-col items-center">
			<div class="w-full h-40 mx-auto overflow-hidden relative">
				<img
					class="absolute top-0 left-0 w-full h-full object-contain"
					src="/images/home-generate.svg"
					alt=""
				/>
			</div>
			<br />
			<div class="flex items-center">
				<strong>Generate</strong>
			</div>
			<br />
			<p class="text-md max-w-xs mx-auto">
				Create a UI by describing, linking to a live website, or attaching an image (coming soon)
			</p>
		</li>
		<li class="flex flex-col items-center">
			<div class="w-full h-40 mx-auto overflow-hidden relative">
				<img
					class="absolute top-0 left-0 w-full h-full object-contain"
					src="/images/home-collect.svg"
					alt=""
				/>
			</div>
			<br />
			<div class="flex items-center">
				<strong>Collect</strong>
			</div>
			<br />
			<p class="text-md max-w-xs mx-auto">
				Choose an element from the UI, then copy the code, or save to collection
			</p>
		</li>
		<li class="flex flex-col items-center">
			<div class="w-full h-40 mx-auto overflow-hidden relative">
				<img
					class="absolute top-0 left-0 w-full h-full object-contain"
					src="/images/home-edit.svg"
					alt=""
				/>
			</div>
			<br />
			<div class="flex items-center">
				<strong class="mr-2">Edit</strong>
				<div class="text-xs bg-black rounded-xl px-2 py-1">
					<p class="text-white">COMING SOON</p>
				</div>
			</div>

			<br />
			<p class="text-md max-w-xs mx-auto">
				Edit the UI using the Edit options, or simply describe what you want
			</p>
		</li>
	</ul>
</main>
