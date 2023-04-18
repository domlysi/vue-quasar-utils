<template>
  <q-dialog
    :model-value="modelValue"
    full-width
    position="bottom"
    seamless square
    @update:modelValue="val => $emit('update:modelValue', val)"
  >
    <q-card dark>
      <q-card-section class="row items-center no-wrap">
        <slot>
          <div class="row full-width q-col-gutter-md" data-nosnippet="true">
            <div class="col-12">

            </div>

            <div class="col-12">
              <div class="text-weight-bold">{{ title }}</div>
              <slot>
                <div class="text-grey full-width" style="white-space: pre-line;" v-html="text"></div>
              </slot>
            </div>
            <div class="col-12">
              <slot name="actions">
                <div class="col-shrink q-gutter-md flex items-center justify-center">
                  <div>
                    <q-btn :label="btnSettingLabel" color="primary" dense flat @click="settingsModal"/>
                  </div>
                  <div>
                    <q-btn :label="btnDenyLabel" color="primary" outline @click="deny"/>
                  </div>
                  <div>
                    <q-btn :label="btnAcceptLabel" color="primary" unelevated @click="accept"/>
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </slot>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showSettings" @close="$emit('close')">
    <q-card>
      <q-card-section>
        <q-list>
          <q-item v-for="item in cookieScripts" :key="item.name">

            <q-item-section>
              <q-item-label>{{ item.name }} {{ item.label }}</q-item-label>
              <q-item-label v-if="item.description" caption>{{ item.description }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-toggle :model-value="!!cookieStatus[item.slug]" @update:modelValue="cookieToggle(item)"></q-toggle>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-close-popup flat label="Cancel"></q-btn>
        <q-btn v-close-popup color="primary" label="Save settings" outline @click="save"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {onMounted, reactive, ref, watch} from 'vue';
import {Cookies} from 'quasar';
import {cookieConsent} from './CookieConsent.js'

export default {
  name: "CookieConsent",
  props: {
    title: {required: false},
    text: {required: false},
    btnAcceptLabel: {required: false, default: 'Accept all'},
    btnDenyLabel: {required: false, default: 'Only necessary'},
    btnSettingLabel: {required: false, default: 'Settings'},
    modelValue: {default: false, required: true}
  },
  emits: ['update:modelValue', 'accepted', 'acceptedBtnClick', 'deny', 'denyBtnClick', 'close'],
  setup(props, {emit}) {
    const showSettings = ref(false)
    const cookieScripts = ref([])
    const cookieStatus = reactive({})

    if (Cookies.get('cookieConsent')) {
      cookieConsent.accept({all: false})
    } else {
      emit('update:modelValue', true)
    }

    const isCookieActives = function (itemSlug) {
      return !!Cookies.get(itemSlug)
    }

    watch(
      () => cookieScripts,
      (val) => {
        val.value.forEach(item => {
          cookieStatus[item.slug] = item.isActive()
        })
      },
      {deep: true}
    )

    const cookieToggle = function (item) {
      if (Cookies.get(item.slug, true)) {
        item.removeCookie()
        cookieStatus[item.slug] = false
      } else {
        item.setCookie(true)
        cookieStatus[item.slug] = true
      }
    }

    const accept = function () {
      cookieConsent.accept({all: true})
      emit('update:modelValue', false)
      emit('accepted')
      emit('acceptedBtnClick')
      emit('close')
    }

    const deny = function () {
      cookieConsent.removeNotRequiredCookies()
      cookieConsent.accept({all: false})
      emit('update:modelValue', false)
      emit('deny')
      emit('denyBtnClick')
      emit('close')
    }

    const save = function () {
      cookieConsent.accept({all: false})
      emit('update:modelValue', false)
      emit('close')
    }

    const settingsModal = function () {
      console.log('settings modal')
      showSettings.value = true
    }

    onMounted(() => {
      cookieScripts.value = cookieConsent.getAll()
    })

    return {
      accept,
      cookieConsent,
      showSettings,
      settingsModal,
      deny,
      save,
      cookieScripts,
      cookieToggle,
      isCookieActives,
      cookieStatus,
      close
    }
  }
}
</script>
