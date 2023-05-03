<template>
  <!-- mobile -->
  <template v-if="$q.screen.xs || onlyVertical ">

    <template v-if="!loading && items">
      <div ref="mobileWrapperRef" class="full-width flex no-wrap q-gutter-x-lg q-py-lg q-pr-lg"
           style="overflow-x: scroll">
        <div v-for="(item, i) in items" :key="i" :class="itemClass + (!isMarginLeft && i === 0 ? ' q-ml-none' : '')">
          <div :style="{width: itemWidth, maxWidth: itemMaxWidth, minWidth: itemMinWidth, height: 'auto'}">
            <slot name="default" :item="item" :index="i"></slot>
          </div>
        </div>
        <div v-if="loadingMore">
          <slot name="loadMoreWrapper">
            <div :style="{width: `calc(${itemWidth} / 2)`}" class="full-height flex items-center justify-center">
              <q-spinner-dots size="5rem"></q-spinner-dots>
            </div>
          </slot>
        </div>
      </div>
    </template>

    <template v-if="loading">
      <div class="full-width flex no-wrap q-gutter-x-lg q-py-lg q-pr-lg" style="overflow-x: scroll">
        <div v-for="i in skeletonAmount" :key="i">
          <div :style="{width: itemWidth}">
            <slot name="skeletonMobile">
              <q-skeleton height="300px" />
            </slot>
          </div>
          <div></div>
        </div>
      </div>
    </template>

  </template>

  <!-- desktop -->
  <template v-else-if="items">
    <div :class="withContainer ? 'container' : ''">
      <div class="row q-col-gutter-md">

        <template v-if="!loading">
          <div
              v-for="(item, i) in items" :key="i"
              :class="`${colClasses} ${itemClass}`"
          >
            <slot :index="i" :item="item" name="default"/>
          </div>
        </template>

        <template v-if="loading">
          <div
              v-for="i in skeletonAmount" :key="i"
              :class="`${colClasses} ${itemClass}`"
          >
            <slot name="skeleton">
              <q-skeleton
                  height="300px"
              >
              </q-skeleton>
            </slot>
          </div>
        </template>
      </div>
    </div>
  </template>
</template>

<script>
import {ref, watchEffect} from 'vue'
import {debounce} from 'quasar';

export default {
  name: 'ResponsiveItemSlider',
  emits: ['load'],
  props: {
    infiniteScrollOffset: {
      default: 400,
    },
    loading: {
      default: false,
    },
    loadingMore: {
      default: false,
    },
    items: {
      required: true,
      default: () => [],
      type: Array
    },
    itemWidth: {
      default: '80vw',
    },
    itemMaxWidth: {default: '350px'},
    itemMinWidth: {default: '250px'},
    itemClass: {default: ''},
    colClasses: {default: 'col-6 col-md-4'},
    onlyVertical: {default: false},
    isMarginLeft: {default: true},
    withContainer: {default: true},
    skeletonAmount: {default: 6},
    skeletonAmountMobile: {default: 2}
  },

  setup(props, ctx) {
    const mobileWrapperRef = ref()
    const scrollEventListener = ref()
    const scrollEventListenerTriggered = ref(false)

    const handleScroll = debounce((e) => {
      if (scrollEventListenerTriggered.value) return
      const curPos = (e.target.scrollLeft || 0) + e.target.clientWidth
      const endPos = e.target.scrollWidth
      if (curPos + props.infiniteScrollOffset >= endPos) {
        scrollEventListenerTriggered.value = true
        ctx.emit('load')
        scrollEventListenerTriggered.value = false
      }
    })

    watchEffect(() => {
      if (!props.loading && props.items && !scrollEventListener.value && mobileWrapperRef.value) {
        scrollEventListener.value = mobileWrapperRef.value.addEventListener('scroll', handleScroll)
      }
    })

    return {
      mobileWrapperRef,
    }
  }
}
</script>
