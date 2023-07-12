<template>
  <q-select
      :error="!!errors ? true : undefined"
      :error-message="errors ? errors.join(' ') : undefined"
      v-bind="$attrs"
      :behavior="behavior"
      :options="fieldOptions"
      emit-value
      map-options
  >
    <template v-for="(name, index) in $slots" v-slot:[name]>
      <slot :name="name"/>
    </template>
  </q-select>
</template>

<script>
import {computed} from 'vue'

export default {
  name: 'ApiSelect',
  props: {
    errors: {default: undefined},
    options: {
      type: Array,
      default: []
    },
    field: {
      type: Object
    },
    behavior: {
      default: 'menu'
    }
  },
  setup(props) {
    const fieldOptions = computed(() => {
      return props.options.flatMap((obj) => {
        return {
          label: obj['display_name'],
          value: obj['value']
        }
      })
    })

    return {
      fieldOptions,
    }
  }
}
</script>

<style scoped>

</style>
