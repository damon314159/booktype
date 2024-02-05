<script lang="ts">
  /**
-better colors
-animated colors
-animated caret

things left for the prototype to be done:
-caret should move when resizing.
-handle space (currently space does nothing)
-handle backspace (delete to fix a word)

things for second version of prototype:
-handle wrong words and letters
-underline wrong words
-scoring
*/

  import { onMount } from 'svelte'
  // eslint-disable-next-line import/prefer-default-export
  export let resetCaret: () => void
  export let hideCaret: () => void

  const text =
    "There was something in the sky. What exactly was up there wasn't immediately clear. But there was definitely something in the sky and it was getting bigger and bigger."
  const words: string[] = text.split(' ')
  let inputElValue: string
  let wordsEl: HTMLDivElement
  let letterEl: HTMLSpanElement
  let caretEl: HTMLDivElement
  let isInputFocused = false
  let caretElTop = 0
  let caretElLeft = 0
  let wordIndex = 0
  let letterIndex = 0

  onMount(() => {
    letterEl = wordsEl.children[wordIndex].children[
      letterIndex
    ] as HTMLSpanElement
    caretElTop = letterEl.offsetTop
    caretElLeft = letterEl.offsetLeft
    caretEl.classList.remove('hidden')
  })

  hideCaret = (): void => {
    caretEl.classList.add('hidden')
  }

  resetCaret = (): void => {
    letterEl = wordsEl.children[wordIndex].children[
      letterIndex
    ] as HTMLSpanElement

    caretElTop = letterEl.offsetTop
    caretElLeft = letterEl.offsetLeft
    caretEl.classList.remove('hidden')
  }

  function game(node: HTMLInputElement): { destroy: () => void } {
    function updateGameState(): void {
      function setLetter(): void {
        const isWordCompleted = letterIndex > words[wordIndex].length - 1

        if (isWordCompleted) {
          wordIndex += 1
          letterIndex = 0
        }

        letterEl = wordsEl.children[wordIndex].children[
          letterIndex
        ] as HTMLSpanElement
      }

      function moveCaret(): void {
        const offset = 4
        caretElTop = letterEl.offsetTop + offset
        caretElLeft = letterEl.offsetLeft + letterEl.offsetWidth
      }

      function checkLetter(): void {
        const currentLetter = words[wordIndex][letterIndex]

        if (inputElValue === currentLetter) {
          letterEl.classList.add('dark:text-white', 'text-black')
        }

        if (inputElValue !== currentLetter) {
          letterEl.classList.add('dark:text-red-400', 'text-red-600')
        }
      }

      function nextLetter(): void {
        letterIndex += 1
        moveCaret()
      }

      function resetLetter(): void {
        node.value = ''
      }

      setLetter()
      checkLetter()
      resetLetter()
      nextLetter()
    }

    function handleInput(): void {
      inputElValue = node.value
      if (inputElValue) {
        updateGameState()
      }
    }

    function handleKeydown(event: KeyboardEvent): void {
      if (event.key === ' ') {
        event.preventDefault()
      }
    }

    function handleFocus(): void {
      isInputFocused = true
    }

    function handleBlur(): void {
      isInputFocused = false
    }

    node.addEventListener('focus', handleFocus)
    node.addEventListener('blur', handleBlur)
    node.addEventListener('input', handleInput)
    node.addEventListener('keydown', handleKeydown)
    return {
      destroy(): void {
        node.removeEventListener('focus', handleFocus)
        node.removeEventListener('blur', handleBlur)
        node.removeEventListener('input', handleInput)
        node.removeEventListener('keydown', handleKeydown)
      }
    }
  }
</script>

<input use:game type="text" class="" />
<div
  bind:this={wordsEl}
  class="mb-2 text-justify text-2xl font-bold text-gray-400 dark:text-gray-600"
>
  {#each words as word, i (i)}
    <span>
      {#each word as letter}
        <span class="transition-colors">{letter}</span>
      {/each}
    </span>
    {#if i < words.length - 1}{' '}{/if}
  {/each}
  <div
    bind:this={caretEl}
    class:animate-blink={!isInputFocused}
    class="absolute hidden h-[1em] w-[0.1em] bg-black transition-all duration-100 ease-in-out dark:bg-white"
    style="top: {caretElTop}px; left: {caretElLeft}px;"
  />
</div>
