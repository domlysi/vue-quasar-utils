<template>
  <q-select
      :error="!!errors ? true : undefined"
      :error-message="errors ? errors.join(' ') : undefined"
      v-bind="$attrs"
  >
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
  </q-select>
</template>

<script>
export default {
  name: 'ApiSelect',
  props: {
    errors: { default: undefined }
  }
}
</script>

<style scoped>

</style>