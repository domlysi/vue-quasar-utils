<template>
  <q-img
      v-bind="$attrs"
      :srcset="srcSetInline"
      :src="src"
  >
    <template #default>
      <template v-if="!srcset && !src && showPlaceholder">
        <slot name="placeholder">
          <div class="bg-grey-3 full-width full-height">
            <div class="absolute-center text-grey-5 text-center">
              <q-icon name="image" size="md" />
              <div>Kein Bild</div>
            </div>
          </div>
        </slot>
      </template>
    </template>
  </q-img>
</template>

<script>

export default {
  name: "SrcsetImg",
  props: {
    src: { required: true},
    srcset: { required: false },
    showPlaceholder: {
      default: false,
      type: Boolean
    },
  },
  computed: {
    srcSetInline() {
      if (!this.srcset) { return }
      return this.srcset.flatMap(obj =>`${obj.src} ${obj.size[0]}w`).join(', ')
    }
  }
}
</script>