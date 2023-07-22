<script>
    import { useCompletion } from 'ai/svelte';
   
    const { input, handleSubmit, completion } = useCompletion({
      api: '/api/completion',
    });
  </script>
   
  <main>
    <form on:submit={handleSubmit}>
      <input type="text" bind:value={$input} placeholder="Describe your business..." />
      <button type="submit">Generate Slogan</button>
    </form>
    <p>{$completion}</p>
  </main>