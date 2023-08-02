<script>
	import { Constants } from '$lib';
	import Header from '../components/Header.svelte';
</script>

<main class="h-screen">
	<Header />

	<div class="pt-15 flex items-center justify-center h-3/4">
		<div class="max-w-prose mx-auto sm:px-6 lg:max-w-7xl lg:px-8 py-6">
			<h1 class="text-4xl font-bold text-center text-gray-900">
				Create web component in a few words <br /> or from other sites
			</h1>
			<p class="mt-2 text-lg text-center leading-7 p-4">
				Describe your design in a few words, or drop in a URL of a website <br /> that inspires you below
			</p>
			<div class="m-4 flex items-center border border-black rounded-xl p-1.5">
				<input
					type="text"
					class="w-full py-2 px-4 outline-none font-semibold"
					placeholder="Create a chat UI with red bubbles..."
				/>
				<button class="bg-black hover:bg-gray-700 text-white py-3 px-5 rounded-xl">Generate</button>
			</div>
		</div>
	</div>

	<h1 class="text-4xl font-extrabold text-center text-gray-900">How this works</h1>
</main>
