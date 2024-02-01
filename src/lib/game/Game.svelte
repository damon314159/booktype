<script lang="ts">
  function game(node: HTMLElement): { destroy: () => void } {
    return {
      destroy(): void {}
    }
  }
</script>

<input type="text" class="hidden" />
<div id="text-container" class="mb-2 text-xl font-bold" use:game>
  <p class="text-cyan-300">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, porro!
    Vero libero dolor aspernatur tempore quo aliquam inventore! Tempora itaque
    voluptates non ab! Numquam magnam neque distinctio voluptates? Obcaecati,
    ab. <span>THIS SPAN HAS MANY WORDS</span>
  </p>
  <p class="text-red-300">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat voluptate
    sunt velit nihil nesciunt labore laboriosam sequi nisi incidunt? Iste
    tempora unde vitae, accusamus cupiditate in velit laudantium officiis optio.
  </p>
</div>
