<template>
  <transition-group
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div class="fixed-bottom fixed-left z-max" key="galleryModal">
      <div class="dimmed-background full-height">
        <div class="flex column no-wrap full-height">
          <div class="q-pb-md relative-position" style="flex-grow: 1; user-select: none" v-touch-swipe.mouse="getScale === 1 ? handleSwipe : undefined">
            <div class="text-center full-height flex flex-center">
              <div class="relative-position" :key="activeImage.file" >

                <component v-bind="getImgComponent(activeImage)" :is="imgComponent"
                  :key="activeImagePosition"
                  :draggable="false"
                  class="vertical-middle"
                  width="100vw"
                  :fit="'contain'"
                  style="max-height: calc(100vh - 200px)"
                  ref="activeImg"
                  :style="transformStyle"
                  v-touch-pan.mouse="touchPanHandler"
                />
<!--                <img v-else :src="activeImage.file">-->

                <div v-if="activeImage.description" class="q-px-sm gallery-image-description bg-black text-white absolute-bottom-left">
                  {{ activeImage.description }}
                </div>
              </div>
            </div>
          </div>

          <div style="max-width: 100%; overflow: auto; scroll-behavior: smooth" ref="thumbContainer">
            <div class="flex row no-wrap relative-position" style="height: 100%;">
              <div class="q-ma-xs thumbnails" v-for="(obj, index) in images" :key="obj.file" :class="{'active': index === activeImagePosition}">
                <component v-bind="getImgComponent(obj)" :is="imgComponent"
                  :ref="`gallery-thumb-${index}`"
                  :ratio="3/2"
                  @click="activeImagePosition = index; scale = 1"
                  class="cursor-pointer full-height"
                  style="width: 200px"
                />
              </div>
            </div>
          </div>

        </div>

        <div class="fixed-top-right z-max">
          <q-btn flat round text-color="white" @click="closeModal" icon="close" />
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts">

import {defineComponent} from 'vue'

export interface Image {
  file: string,
  description?: string
  default_alt_text?: string
  thumb?: object
}


import SrcsetImg from './SrcsetImg';
let lastDistance = undefined

export default defineComponent({
  name: "GalleryModal",
  components: {SrcsetImg},
  mounted() {
    document.body.style.overflow = 'hidden'
    this.activeImagePosition = this.position
    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('wheel', this.wheelHandler);
    document.addEventListener('touchmove', this.touchMove)
    document.addEventListener('touchend', this.touchEnd)
  },

  unmounted() {
    document.removeEventListener('keydown', this.keydownHandler);
    document.removeEventListener('wheel', this.wheelHandler);
    document.removeEventListener('touchmove', this.touchMove);
    document.removeEventListener('touchend', this.touchEnd)
    this.closeModal()
  },

  props: {
    images: {
      required: true,
      type: undefined as () => Array<Image>
    },
    position: {
      default: 0
    },
    withSrcSetImage: {
      default: false
    }
  },

  emits: ['closeModal', ],


  watch: {
    activeImagePosition(newVal) {
      this.scrollToThumb(newVal)
      this.resetImageTransformations()
    }
  },

  computed: {
    transformStyle: function () {
      if (this.scale <= 1) { this.resetImageTransformations() }
      return {
        'transform': `scale(${this.scale}) translateX(${this.translateX / this.scale}px)  translateY(${this.translateY / this.scale}px)`,
      }
    },

    activeImage: function () {
      if (this.images.length < 1) { return undefined}
      return this.images[this.activeImagePosition]
    },

    getScale: function () {
      return this.scale
    },

    imgComponent() {
      return this.withSrcSetImage ? 'srcset-img' : 'q-img'
    }
  },

  methods: {
    getImgComponent(image) {
      if (this.withSrcSetImage) {
        return {
          alt: image.default_alt_text,
          image: image
        }
      }
      return {
        src: image.file
      }
    },

    touchEnd: function (e) {
      lastDistance = undefined
      this.scaling = false
      console.log('end', e)
    },

    touchMove: function (e) {
      this.touches = []
      if (e.touches && e.touches.length) {
        if (e.touches.length === 2) {
          this.scaling = true
          let obj1 = e.touches.item(0)
          let obj2 = e.touches.item(1)

          let p1 = {x: obj1.screenX, y: obj1.screenY}
          let p2 = {x: obj2.screenX, y: obj2.screenY}

          let distance = Math.abs(Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)))

          if (!lastDistance) {
            lastDistance = distance
          }

          let deltaDistance = Math.abs(lastDistance - distance)
          console.log(deltaDistance)
          if (deltaDistance < 2) { return }

          if (deltaDistance > 100) {
            console.log('distance', distance, 'lastDistance', lastDistance)
          }

          // deltaDistance between 0-10 usually
          if (deltaDistance > 10) {
            deltaDistance = 10
          }

          // 10 = 100% = 0.25
          // 5 = 50% = 0.125
          // 0 = 0% = 0
          let normalizeScale = deltaDistance * 10 / (100/0.25)

          if (distance > lastDistance) {
            console.log('zoom in', deltaDistance)
            this.scale = this.scale + normalizeScale
          } else {
            console.log('zoom out', deltaDistance)
            this.scale = this.scale - normalizeScale
          }
          lastDistance = distance
        }
      }
    },

    touchPanHandler: function (e) {
      if (this.scale > 1 && !this.scaling) {
        this.translateX = this.translateX + e.delta.x
        this.translateY = this.translateY + e.delta.y
      }
    },

    wheelHandler: function (e) {
      if (e.deltaY > 0) {
        if (this.scale > 1) {
          this.scale = this.scale - 0.25
        }

      } else if (this.scale < 5) {
        this.scale = this.scale + 0.25
      }
    },

    keydownHandler: function (e) {
      if (e.key === 'Escape') {
        this.closeModal()
      }
      if (e.key === 'ArrowLeft') {
        this.activeImagePosition = this.getPrevPosition(this.activeImagePosition)
      }
      if (e.key === 'ArrowRight') {
        this.activeImagePosition = this.getNextPosition(this.activeImagePosition)
      }
    },

    scrollToThumb: function (pos) {
      let ref = this.$refs[`gallery-thumb-${pos}`]
      let eleWidth = ref[0].$el.clientWidth
      let left = ref[0].$el.offsetLeft

      this.$refs.thumbContainer.scrollLeft =  left - (eleWidth / 2)
    },
    closeModal: function () {
      document.body.style.overflow = 'auto'
      this.$emit('closeModal')
    },

    handleSwipe: function ({ evt, ...newInfo }) {
      if (newInfo.direction === 'right') {
        this.activeImagePosition = this.getPrevPosition(this.activeImagePosition)
      }
      if (newInfo.direction === 'left') {
        this.activeImagePosition = this.getNextPosition(this.activeImagePosition)
      }
    },

    resetImageTransformations: function () {
      this.scale = 1
      this.translateX = 0
      this.translateY = 0
    },

    getNextPosition: function (pos) {
      let newPos = pos + 1
      if (newPos > this.images.length - 1) { return 0 }
      return newPos
    },
    getPrevPosition: function (pos) {
      let newPos = pos - 1
      if (newPos < 0 ) { return this.images.length - 1 }
      return newPos
    }
  },

  data () {
    return {
      scale: 1.0,
      activeImagePosition: this.position,
      translateX: 0,
      translateY: 0,
      scaling: false,
    }
  },
})
</script>

<style scoped lang="scss">
.dimmed-background {
  background-color: rgba(0, 0, 0, 0.8);
}

.thumbnails {
  &.active {
    //transform: scale(0.95);
    filter: brightness(0.4);
    z-index: 1;
    transition: all 0.2s ease-out;
  }
}

</style>