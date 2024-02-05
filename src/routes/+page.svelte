<script lang="ts">
  // eslint-disable-next-line import/no-duplicates
  import { tweened } from 'svelte/motion'
  // eslint-disable-next-line import/no-duplicates
  import { cubicOut } from 'svelte/easing'
  import Mode from '$lib/components/ui/mode/Mode.svelte'
  import Game from '$lib/game/Game.svelte'

  const tweenedWidth = tweened(80)
  let isResizing = false
  let setCaret: (hide?: boolean) => void

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
        .then(() => {
          setCaret()
        })
        .catch(handleError)
    }

    function handleMouseup(): void {
      mouseCurrentX = null
      if (!isResizing) {
        return
      }
      isResizing = false
      if ($tweenedWidth < 60) {
        setCaret(true)
        tweenedWidth
          .set(60, { duration: 100, easing: cubicOut })
          .then(() => {
            setCaret()
          })
          .catch(handleError)
      }
      if ($tweenedWidth > 140) {
        setCaret(true)
        tweenedWidth
          .set(130, { duration: 100, easing: cubicOut })
          .then(() => {
            setCaret()
          })
          .catch(handleError)
      }
    }
    function handleDoubleClick(): void {
      setCaret(true)
      tweenedWidth
        .set(80, { duration: 300, easing: cubicOut })
        .then(() => {
          setCaret()
        })
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
      <div class="mb-2 text-3xl font-extrabold">
        Chapter 9: Chapter Description
      </div>
      <div
        style="width: {$tweenedWidth}vmin;"
        class="h-[80vmin] min-w-[45vmin] max-w-[160vmin] rounded-lg border p-5 shadow-lg"
      >
        <!-- GAME COMPONENT -->
        <Game bind:setCaret />
        <!-- GAME COMPONENT -->
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
