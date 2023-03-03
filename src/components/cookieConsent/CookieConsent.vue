<template>
  <q-dialog full-width v-model="cookieDialog" seamless square position="bottom">
    <q-card dark>
      <q-card-section class="row items-center no-wrap">
        <slot>
          <div class="row full-width">
            <div class="col">
              <div class="text-weight-bold">{{ title }}</div>
              <div class="text-grey full-width" style="white-space: pre-line;" v-html="text"></div>
            </div>
            <div class="col-shrink flex items-center justify-end">
              <div>
                <q-btn :label="btnAcceptLabel" color="primary" dense flat @click="accept"/>
              </div>
            </div>
          </div>
        </slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import {ref} from 'vue';
import {useQuasar} from 'quasar';

export default {
  name: "CookieConsent",
  props: {
    title: { required: false},
    text: { required: false},
    btnAcceptLabel: { required: false, default: 'Accept' },
  },
  emits: ['accepted'],
  setup(props, {emit}) {
    const $q = useQuasar()
    let cookieDialog = ref(false)

    if ($q.cookies.has('cookieConsent')) {
      emit('accepted')
    } else {
      cookieDialog.value = true
    }

    const accept = function () {
      $q.cookies.set('cookieConsent', 'true', { path: '/', expires: 400, sameSite: "Lax"},)
      cookieDialog.value = false
      emit('accepted')
    }

    return {
      cookieDialog,
      accept
    }
  }
}
</script>