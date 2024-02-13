<script lang="ts">
  import { onMount } from 'svelte'

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

  function setLetterEl(): void {
    letterEl = wordsEl.children[wordIndex].children[letterIndex] as HTMLSpanElement
  }

  // Caret functions
  // TODO Replace with a store
  hideCaret = (): void => {
    caretEl.classList.add('hidden')
  }

  resetCaret = (): void => {
    setLetterEl()
    caretElTop = letterEl.offsetTop
    caretElLeft = letterEl.offsetLeft
    caretEl.classList.remove('hidden')
  }

  function game(node: HTMLInputElement): { destroy: () => void } {
    function moveCaret(direction: 'forward' | 'backward' = 'forward'): void {
      const offset = 4
      if (direction === 'forward') {
        caretElTop = letterEl.offsetTop + offset
        caretElLeft = letterEl.offsetLeft + letterEl.offsetWidth
      }
      if (direction === 'backward') {
        caretElTop = letterEl.offsetTop + offset
        caretElLeft = letterEl.offsetLeft
      }
    }

    function updateGameState(): void {
      function setLetter(): void {
        const isWordCompleted = letterIndex > words[wordIndex].length - 1

        if (isWordCompleted) {
          wordIndex += 1
          letterIndex = 0
        }
        setLetterEl()
      }

      function checkLetter(direction: 'forward' | 'backward' = 'forward'): void {
        const currentLetter = words[wordIndex][letterIndex]

        if (direction === 'backward') {
          letterEl.classList.remove('dark:text-white', 'text-black')
          letterEl.classList.remove('dark:text-red-400', 'text-red-600')
        }

        if (inputElValue === currentLetter) {
          letterEl.classList.add('dark:text-white', 'text-black')
        }

        if (inputElValue !== currentLetter) {
          letterEl.classList.add('dark:text-red-400', 'text-red-600')
        }
      }

      function nextLetter(): void {
        letterIndex += 1
      }

      function resetLetter(): void {
        node.value = ''
      }

      setLetter()
      checkLetter()
      resetLetter()
      nextLetter()
      moveCaret()
    }

    function handleInput(): void {
      inputElValue = node.value
      if (inputElValue) {
        updateGameState()
      }
    }

    function handleBackspace(): void {
      if (letterIndex > 0) {
        letterIndex -= 1
        setLetterEl()
        moveCaret('backward')
        letterEl.classList.remove('dark:text-white', 'text-black')
        letterEl.classList.remove('dark:text-red-400', 'text-red-600')
      }
      if (letterIndex === 0) {
        if (wordIndex > 0) {
          wordIndex -= 1
          letterIndex = words[wordIndex].length
          setLetterEl()
          moveCaret('forward')
          letterEl.classList.remove('dark:text-white', 'text-black')
          letterEl.classList.remove('dark:text-red-400', 'text-red-600')
        }
      }
    }

    function handleKeydown(event: KeyboardEvent): void {
      if (event.key === ' ') {
        event.preventDefault()
      }

      if (event.key === 'Backspace') {
        handleBackspace()
      }
      if (event.key) {
        console.log('keyboard Event:', wordIndex, '<- WI LI ->', letterIndex)
      }
      node.focus()
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
    document.addEventListener('keydown', handleKeydown)
    return {
      destroy(): void {
        node.removeEventListener('focus', handleFocus)
        node.removeEventListener('blur', handleBlur)
        node.removeEventListener('input', handleInput)
        document.removeEventListener('keydown', handleKeydown)
      }
    }
  }

  onMount(() => {
    setLetterEl()
    caretElTop = letterEl.offsetTop
    caretElLeft = letterEl.offsetLeft
    caretEl.classList.remove('hidden')
  })
</script>

<input use:game type="text" class="absolute h-0 w-0 opacity-0" />
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
