<script>
	import { FirebaseService } from '$lib/firebase';
	import { onMount } from 'svelte';
	import mixpanel from '$lib/mixpanel';
	import { page } from '$app/stores';
	import '../app.css';

	onMount(() => {
		const firebaseService = new FirebaseService();
		mixpanel.track('Page Viewed', { page: $page.url.pathname });
	});
</script>

<slot />
