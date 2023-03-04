<template>
  <q-input
      :error="!!errors ? true : undefined"
      :error-message="errors ? errors.join(' ') : undefined"
      v-bind="$attrs"
  >
    <slot></slot>
  </q-input>
</template>

<script>
export default {
  name: 'ApiInput',
  props: {
    errors: { default: undefined}
  }
}
</script>

<style scoped>

</style>