import { onBeforeUnmount } from 'vue';

export const useKeydown = function(keyCombos: {key: string, fn: Function }[]) {
  const onkey = function(event: { key: string }) {
    const kc = keyCombos.find(({key}) => key == event.key )
    if(kc) {
      kc.fn()
    }
  }

  window.addEventListener('keydown', onkey);

  onBeforeUnmount(()=> {
    window.removeEventListener('keydown', onkey);
  })
}

export default useKeydown;
