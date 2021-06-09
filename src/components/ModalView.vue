<template>
  <div class="modal">
    <div class="overlay" @click="closeModal"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
import { useKeydown } from '../composables/use-keydown';
export default {
  setup(props){
    useKeydown([{key: 'Escape', fn: props.closeModal}])
  },
  props: {
    closeModal: {
      type: Function,
      required: true
    }
  }
}
</script>
