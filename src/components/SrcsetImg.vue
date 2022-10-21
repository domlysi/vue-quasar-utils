<template>
  <q-img
    v-bind="$attrs"
    :srcset="srcSetInline"
    :src="src"
  >
    <template #default>
      <slot name="default">
        <template v-if="!srcset && !src">
          <div class="bg-grey-3 full-width full-height">
            <div class="absolute-center text-grey-5 text-center">
              <q-icon name="image" size="md" />
              <div>Kein Bild</div>
            </div>
          </div>
        </template>
      </slot>
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