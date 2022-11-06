<template>
  <template v-if="$q.screen.xs || onlyVertical">

    <template v-if="!loading">
      <div class="full-width flex no-wrap q-gutter-x-lg q-py-lg q-pr-lg" style="overflow-x: scroll">
        <div v-for="(item, i) in items" :key="i" :class="itemClass + (!isMarginLeft && i === 0 ? ' q-ml-none' : '')">
          <div :style="{width: itemWidth, maxWidth: itemMaxWidth, minWidth: itemMinWidth, height: itemHeight}">
            <slot name="default" :item="item" :index="i"></slot>
          </div>
          <div></div>
        </div>
      </div>
    </template>

    <template v-if="loading">
      <div class="full-width flex no-wrap q-gutter-x-lg q-py-lg q-pr-lg" style="overflow-x: scroll">
        <div v-for="i in 2" :key="i">
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

  <template v-else>
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
            v-for="i in 6" :key="i"
            class="col-6 col-md-4"
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
    itemHeight: { default: '500px' },
    itemMinWidth: { default: '250px' },
    itemClass: { default: undefined },
    colClasses: { default: 'col-6 col-md-4' },
    onlyVertical: { default: false },
    isMarginLeft: { default: true },
    withContainer: { default: true },
  },
  data() {
    return {

    }
  }
}
</script>