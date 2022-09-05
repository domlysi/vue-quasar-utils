<template>
  <q-img
    v-bind="$attrs"
    :srcset="srcSetInline"
    :src="src"
  >
    <template #default>
      <slot name="default"></slot>
    </template>
  </q-img>
</template>

<script>

export default {
  name: "SrcsetImg",
  props: {
    src: { required: true},
    srcset: { required: false },
  },
  computed: {
    srcSetInline() {
      if (!this.srcset) { return }
      return this.srcset.flatMap(obj =>`${obj.src} ${obj.size[0]}w`).join(', ')
    }
  }
}
</script>