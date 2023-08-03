<script>
	import { Constants } from '$lib';

	const isValidUrl = (string) => {
		try {
			new URL(string);
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

<main class="h-screen">
	<div class="flex items-center justify-center h-3/4">
		<div class="max-w-prose mx-auto sm:px-6 lg:max-w-7xl lg:px-8 py-6">
			<h1 class="text-4xl font-bold text-center text-gray-900">
				Create web component in a few words <br /> or from other sites
			</h1>
			<p class="mt-2 text-lg text-center leading-7 p-4">
				Describe your design in a few words, or drop in a URL of a website <br /> that inspires you below
			</p>
			<form
				on:submit={submitForm}
				class="m-4 flex items-center border border-black rounded-xl p-1.5"
			>
				<input
					name="query"
					type="text"
					class="w-full py-2 px-4 outline-none font-semibold"
					placeholder="Create a chat UI with red bubbles..."
				/>
				<button class="bg-black hover:bg-gray-700 text-white py-3 px-5 rounded-xl">Generate</button>
			</form>
		</div>
	</div>

	<h1 class="text-4xl font-extrabold text-center text-gray-900">How this works</h1>
</main>
