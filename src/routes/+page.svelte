<script lang="ts">
  // eslint-disable-next-line import/no-duplicates
  import { tweened } from 'svelte/motion'
  // eslint-disable-next-line import/no-duplicates
  import { cubicOut } from 'svelte/easing'
  import Mode from '$lib/components/ui/mode/Mode.svelte'

  const tweenedWidth = tweened(80)
  let isResizing = false

  function resizable(node: HTMLElement): { destroy: () => void } {
    let mouseCurrentX: number | null = null
    let startWidth = $tweenedWidth

    function handleError(): void {
      isResizing = false
      mouseCurrentX = null
    }

    function handleMousedown(event: MouseEvent): void {
      mouseCurrentX = event.clientX
      startWidth = $tweenedWidth
      isResizing = true
    }

    function handleMousemove(event: MouseEvent): void {
      if (!isResizing || mouseCurrentX === null) {
        return
      }
      const deltaX: number = event.clientX - mouseCurrentX
      tweenedWidth
        .set(startWidth + deltaX / 5, { duration: 0 })
        .catch(handleError)
    }

    function handleMouseup(): void {
      mouseCurrentX = null
      if (!isResizing) {
        return
      }
      isResizing = false
      if ($tweenedWidth < 60) {
        tweenedWidth
          .set(60, { duration: 100, easing: cubicOut })
          .catch(handleError)
      }
      if ($tweenedWidth > 140) {
        tweenedWidth
          .set(130, { duration: 100, easing: cubicOut })
          .catch(handleError)
      }
    }

    function handleDoubleClick(): void {
      tweenedWidth
        .set(80, { duration: 200, easing: cubicOut })
        .catch(handleError)
    }

    node.addEventListener('mousedown', handleMousedown)
    node.addEventListener('dblclick', handleDoubleClick)
    document.addEventListener('mousemove', handleMousemove)
    document.addEventListener('mouseup', handleMouseup)

    return {
      destroy(): void {
        node.removeEventListener('dblclick', handleDoubleClick)
        node.removeEventListener('mousedown', handleMousedown)
        document.removeEventListener('mousemove', handleMousemove)
        document.removeEventListener('mouseup', handleMouseup)
      }
    }
  }
</script>

<div
  class:select-none={isResizing}
  class="flex h-screen items-center justify-center overflow-hidden"
>
  <div class="flex">
    <div>
      <div class="mb-2 text-3xl font-extrabold">Chapter 9: Your'e mom</div>
      <div
        style="width: {$tweenedWidth}vmin;"
        class="h-[80vmin] min-w-[45vmin] max-w-[160vmin] rounded-lg border p-5 shadow-lg"
      >
        <div class="mb-2 text-xl font-bold">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum,
          porro! Vero libero dolor aspernatur tempore quo aliquam inventore!
          Tempora itaque voluptates non ab! Numquam magnam neque distinctio
          voluptates? Obcaecati, ab.
        </div>
        <div class="mb-2 text-lg font-medium">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta ipsa,
          odio reiciendis quod, corrupti atque culpa perferendis magni incidunt
          quidem asperiores optio nostrum dignissimos accusamus sint, facere
          sequi a! Atque.
        </div>
        <div class="mb-2 text-base font-normal">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo
          perspiciatis, autem dicta beatae blanditiis suscipit voluptatibus ut
          ipsum cum fugit ullam doloremque commodi, doloribus eos mollitia.
          Voluptatibus assumenda debitis magni.
        </div>
        <div class="mb-2 text-sm font-light">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem in,
          nostrum optio quaerat aliquam rerum praesentium veritatis itaque iusto
          quasi animi ullam nesciunt, laborum alias dolorum accusamus harum sunt
          delectus.
        </div>
        <div class="mb-2 text-xs font-thin">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
          porro! Doloribus quia, modi ipsum numquam quis soluta totam laborum
          repellat voluptatem perspiciatis cumque eos! Ipsum sequi autem debitis
          dolores voluptatem?
        </div>
        <div class="text-xxs font-hairline mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias eos
          nemo amet ex praesentium a, magnam minima saepe libero quia blanditiis
          labore id. Omnis quisquam magnam vero rem ut dolorem.
        </div>
      </div>
    </div>
    <div
      class="mx-1 mt-11 h-[80vmin] w-2 cursor-ew-resize self-center rounded-xl transition-colors duration-100 ease-in-out hover:bg-gray-200 active:bg-gray-200"
      use:resizable
    ></div>
    <div class="flex flex-col">
      <div class="flex justify-between">
        <span class="mb-1 text-3xl font-extrabold">Booktype</span>
        <Mode class="mb-1 w-[12vmin]" />
      </div>
      <div
        class="h-[80vmin] w-64 rounded-lg border p-5 shadow-lg max-md:hidden"
      >
        configuration, stats area
      </div>
    </div>
  </div>
</div>
