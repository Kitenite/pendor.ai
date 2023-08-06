<script>
	import { FirebaseService } from '$lib/firebase';
	import '../app.css';
	import { onMount } from 'svelte';

	onMount(() => {
		const firebaseService = new FirebaseService();
	});
</script>

<slot />
