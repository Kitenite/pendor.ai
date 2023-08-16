<script>
	import { FirebaseService } from '$lib/firebase';
	import { onMount } from 'svelte';
	import mixpanel from '$lib/mixpanel';
	import { page } from '$app/stores';
	import '../app.css';

	onMount(() => {
		mixpanel.init('3347224cfc9b58cd7b28adf3b58669bf', {
			debug: true,
			track_pageview: true,
			persistence: 'localStorage'
		});
		const firebaseService = new FirebaseService();
		mixpanel.track('Page Viewed', { page: $page.url.pathname });
	});
</script>

<slot />
