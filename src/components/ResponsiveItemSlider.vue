<template>
  <template v-if="$q.screen.xs || onlyVertical ">

    <template v-if="!loading && items">
      <div class="full-width flex no-wrap q-gutter-x-lg q-py-lg q-pr-lg" style="overflow-x: scroll">
        <div v-for="(item, i) in items" :key="i" :class="itemClass + (!isMarginLeft && i === 0 ? ' q-ml-none' : '')">
          <div :style="{width: itemWidth, maxWidth: itemMaxWidth, minWidth: itemMinWidth, height: 'auto'}">
            <slot name="default" :item="item" :index="i"></slot>
          </div>
          <div></div>
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

  <template v-else-if="items">
    <div :class="withContainer ? 'container' : ''">
      <div class="row q-col-gutter-md">

        <template v-if="!loading">
          <div
            v-for="(item, i) in items" :key="i"
            :class="`${colClasses} ${itemClass}`"
          >
            <slot name="default" :item="item" :index="i" />
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
export default  {
  name: 'ResponsiveItemSlider',
  props: {
    loading: {
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
    itemMaxWidth: { default: '350px' },
    itemMinWidth: { default: '250px' },
    itemClass: { default: '' },
    colClasses: { default: 'col-6 col-md-4' },
    onlyVertical: { default: false },
    isMarginLeft: { default: true },
    withContainer: { default: true },
    skeletonAmount: { default: 6 },
    skeletonAmountMobile: { default: 2 }
  },

  data() {
    return {}
  }
}
</script>