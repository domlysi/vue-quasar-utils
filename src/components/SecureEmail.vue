<template>
  <a
      ref="emailRef"
      class="cryptedmail"
      href="#"
      @click.prevent="click"
  ></a>
</template>

<script>
import {onMounted, ref} from 'vue'

export default {
  name: 'SecureEmail',
  props: {
    email: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: false,
    }
  },

  setup(props) {
    const emailRef = ref()
    onMounted(() => {
      const rest = props.email.split('.')[0]
      const tld = props.email.split('.')[1]
      const user = rest.split('@')[0]
      const domain = rest.split('@')[1]
      emailRef.value.dataset.hi = user
      emailRef.value.dataset.de = domain
      emailRef.value.dataset.this = tld
    })

    const click = function () {
      window.location.href = `mailto:${emailRef.value.dataset.hi}@${emailRef.value.dataset.de}.${emailRef.value.dataset.this}?subject=${props.subject || ''}`
    }

    return {
      emailRef,
      click
    }
  }
}
</script>

<style scoped>
.cryptedmail:after {
  content: attr(data-hi) "@" attr(data-de) "." attr(data-this);
}
</style>