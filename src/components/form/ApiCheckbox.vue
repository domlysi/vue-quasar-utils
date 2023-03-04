<template>
  <div>
    <q-checkbox
        :error="!!errors ? true : undefined"
        :error-message="errors ? errors.join(' ') : undefined"
        v-bind="$attrs"
    >
      <slot>
        <div v-if="hint" class="text-small text-grey">{{ hint }}</div>
      </slot>
    </q-checkbox>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const props = defineProps({
  errors: {default: undefined},
  hint: {default: undefined}
})

const errors = ref()

</script>