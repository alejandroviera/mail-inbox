import { onBeforeUnmount } from 'vue'

export default function useKeydown(
  keyCombos: { keyPressed: string; fn: () => void }[]
) {
  const onKeydown = (event: KeyboardEvent) => {
    const kc = keyCombos.find((kc) => kc.keyPressed === event.key)
    if (kc) {
      kc.fn()
    }
  }
  window.addEventListener('keydown', onKeydown)
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
  })
}
