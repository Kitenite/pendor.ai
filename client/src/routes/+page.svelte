<script>
	import { Constants } from '$lib';
	import Header from '../components/Header.svelte';
</script>

<Header />

<div class="max-w-prose mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-6">
	<h1 class="text-4xl font-extrabold text-center text-gray-900">What is this app?</h1>
	<p class="mt-2 text-lg text-justify leading-7 pt-4">
		This app allows you to create web components using AI from scratch or lift it from other
		websites and edit it with AI. Soon, you'll also be able to create more complex components or
		even full websites. Go to <a class="font-semibold" href={Constants.CREATE_PAGE}>Create page</a> to
		get started.
	</p>

	<ul class="list-disc pl-5 pt-10">
		<li><strong>Create:</strong> Create and edit components with AI</li>
		<li>
			<strong>Collect:</strong> Explore and pull in components from other websites
		</li>
		<li>
			<strong>Components:</strong> View and edit all your saved components
		</li>
	</ul>
</div>
