<script lang="ts">
  import '../app.pcss';
  import { ModeWatcher } from 'mode-watcher';
  import ModeSwitch from '$lib/components/ui/theme/ModeSwitch.svelte';
  import { Button } from '$lib/components/ui/button/';
</script>

<ModeWatcher />
<ModeSwitch />
<Button
  on:click={() => {
    alert('dumbass lmaoo');
  }}
  >Click me :)
</Button>
<slot />
