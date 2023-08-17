<template>
  <div
      ref="wrapperRef"
      :style="{'max-height': !isHidden ? undefined : `${props.maxHeight}px`, 'overflow': isHidden ? 'hidden': 'auto'}"
      class="fade-out-text-wrapper"
  >
    <slot name="default"></slot>

    <div v-if="isHidden" class="overlay">
      <slot name="show-more">
        <q-btn color="primary" flat no-caps @click="isHidden = false">Alles anzeigen</q-btn>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';

const wrapperRef = ref()
const isHidden = ref(false)
const props = defineProps({
  'maxHeight': {
    default: 300,
    type: Number
  },
  trashhold: {
    default: 100,
    type: Number
  },
  backgroundColor: {
    default: 'white',
    type: String
  }
})

onMounted(() => {
  if (wrapperRef.value.scrollHeight > props.maxHeight + props.trashhold) {
    isHidden.value = true
  }
})
</script>

<style lang="scss" scoped>
$backgroundColor: v-bind('backgroundColor');
.fade-out-text-wrapper {
  position: relative;

  & > .overlay {
    position: absolute;
    background: linear-gradient(to top, $backgroundColor 2rem, rgba(255, 255, 255, 0));;
    bottom: 0;
    left: 0;
    right: 0;
    height: 7.5rem;
    max-height: 100%;

    display: flex;
    justify-content: center;
    align-items: flex-end;
  }
}
</style>
