<script lang="ts">
  // eslint-disable-next-line import/no-duplicates
  import { tweened } from 'svelte/motion'
  // eslint-disable-next-line import/no-duplicates
  import { cubicOut } from 'svelte/easing'

  const tweenedWidth = tweened(80)
  let isResizing = false

  function resizable(node: HTMLElement): { destroy: () => void } {
    let mouseCurrentX: number | null = null
    let startWidth = $tweenedWidth

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
      tweenedWidth.set(startWidth + deltaX / 5, { duration: 0 }).catch(() => {
        console.log('no silent catch')
      })
    }

    function handleMouseup(): void {
      mouseCurrentX = null
      if (!isResizing) {
        return
      }
      isResizing = false
      if ($tweenedWidth < 60) {
        tweenedWidth.set(60, { duration: 100, easing: cubicOut }).catch(() => {
          console.log('no silent catch')
        })
      }
      if ($tweenedWidth > 140) {
        tweenedWidth.set(130, { duration: 100, easing: cubicOut }).catch(() => {
          console.log('no silent catch')
        })
      }
    }

    node.addEventListener('mousedown', handleMousedown)
    node.addEventListener('mousemove', handleMousemove)
    node.addEventListener('mouseup', handleMouseup)

    return {
      destroy() {
        node.removeEventListener('mousedown', handleMousedown)
        node.removeEventListener('mousemove', handleMousemove)
        node.removeEventListener('mouseup', handleMouseup)
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
