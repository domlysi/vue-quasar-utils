<template>
  <q-img
      v-bind="$attrs"
      :srcset="srcSetInline"
      :sizes="sizes"
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
      <slot></slot>
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
      if (!this.srcset || !Array.isArray(this.srcset)) {
        return
      }
      return this.srcset.flatMap(obj =>`${obj.src} ${obj.size[0]}w`).join(', ')
    },
    sizes() {
      if (!this.srcset || !Array.isArray(this.srcset)) {
        return
      }
      this.srcset.sort((a, b) => a.size[0] - b.size[0]);

      // Convert to the sizes attribute format
      return this.srcset.map((img, index) => {
        if (index < this.srcset.length - 1) {
          return `(max-width: ${img.size[0]}px) ${img.size[0]}px`;
        } else {
          return `${img.size[0]}px`;
        }
      }).join(', ')
    }

  }

}
</script>
