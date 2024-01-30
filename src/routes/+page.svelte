<script lang="ts">
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  const tweenedWidth = tweened(80)
  let isResizing = false

  function resizable(node: HTMLElement) {
    let mouseCurrentX: number | undefined
    let startWidth: number

    function handleMousemove(event: MouseEvent) {
      if (mouseCurrentX !== undefined) {
        const deltaX: number = event.clientX - mouseCurrentX
        tweenedWidth
          .set(startWidth + deltaX / 5, { duration: 0 })
          .catch(() => {})
        isResizing = true
      }
    }

    function handleMouseup() {
      if ($tweenedWidth < 60) {
        tweenedWidth
          .set(60, { duration: 100, easing: cubicOut })
          .catch(() => {})
      }
      if ($tweenedWidth > 140) {
        tweenedWidth
          .set(130, { duration: 100, easing: cubicOut })
          .catch(() => {})
      }
      mouseCurrentX = undefined
      window.removeEventListener('mousemove', handleMousemove)
      window.removeEventListener('mouseup', handleMouseup)
      isResizing = false
    }

    function handleMousedown(event: MouseEvent) {
      mouseCurrentX = event.clientX
      startWidth = $tweenedWidth
      window.addEventListener('mousemove', handleMousemove)
      window.addEventListener('mouseup', handleMouseup)
    }

    node.addEventListener('mousedown', handleMousedown)

    return {
      destroy() {
        node.removeEventListener('mousedown', handleMousedown)
        window.removeEventListener('mousemove', handleMousemove)
        window.removeEventListener('mouseup', handleMouseup)
      }
    }
  }
</script>

<div
  class="{isResizing
    ? 'select-none'
    : ''} flex h-screen items-center justify-center overflow-hidden"
>
  <div class="flex">
    <div
      style="width: {$tweenedWidth}vmin;"
      class="h-[80vmin] min-w-[45vmin] max-w-[160vmin] bg-green-200"
    >
      typing area
    </div>
    <div
      class="mx-1 h-[80vmin] w-2 cursor-ew-resize self-center rounded-xl hover:bg-gray-200 active:bg-gray-200"
      use:resizable
    ></div>
    <div class="h-[80vmin] w-56 bg-blue-200 max-md:hidden">
      configuration, stats area
    </div>
  </div>
</div>
