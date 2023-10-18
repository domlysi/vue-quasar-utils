<template>
  <div class="row">
    <div
      v-if="!(!multiple && fileList.length > 0) && (!maxFiles || (multiple && fileList.length < maxFiles))"
      class="c-upload-wrapper q-mb-lg bg-grey-3 flex flex-center column cursor-pointer"
      @click="click"
      @drop.prevent="drop"
    >
      <div>
        <q-icon name="fas fa-file-arrow-up" size="lg"/>
        <input
          ref="fileInput"
          :multiple="multiple"
          class="hidden"
          name="files"
          type="file"
          v-bind="$attrs"
          @change="changeFile"
        >
      </div>
      <div>{{ label }}</div>
      <div v-if="multiple && maxFiles" class="text-muted">(max. {{ maxFiles }} Dateien insgesamt)</div>
    </div>

    <template v-if="fileList?.length">
      <div v-if="validationErrors?.length" class="col-12 q-mb-md">
        <q-banner v-for="err in validationErrors" :key="err" class="bg-warning q-mb-sm" rounded>
          {{ err }}
        </q-banner>
      </div>

      <div class="col-12">
        {{ errors }}
      </div>
      <div class="col-12">
        <div class="">
          <template v-if="!gallery">
            <template v-for="(file, index) in fileList" :key="file.name">
              <div
                class="text-bold flex items-center justify-between no-wrap q-my-md"
              >
                <div class="flex items-center no-wrap">
                  <div>
                    <q-icon name="far fa-file" size="lg"/>
                  </div>
                  <div class="q-px-sm" style="overflow-wrap: anywhere">{{ file.name }} ({{ fileSize(file) }})</div>
                  <div v-if="errors && errors[index]" class="text-center text-negative q-mb-sm">
                    <div v-for="err in errors[index]" :key="err">{{ err }}</div>
                  </div>
                </div>
                <div>
                  <q-btn @click="removeFile(index)" round flat size="sm"><q-icon name="fas fa-trash"></q-icon></q-btn>
                </div>
              </div>
            </template>
          </template>

          <!-- Gallery view -->
          <template v-else>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6" v-for="(file, index) in fileList" :key="file.name">
                <template v-if="file.type.startsWith('image/')">
                  <img :src="getUrl(file)" class="full-width" style="max-height: 200px; object-fit: contain"/>
                </template>
                <template v-else>
                  <div class="text-bold text-center" style="overflow-wrap: anywhere">
                    <q-icon name="far fa-file"/>
                    {{ file.name }}
                  </div>
                </template>
                <div class="text-center">
                  <div>{{ fileSize(file) }}</div>
                  <div v-if="errors && errors[index]" class="text-center text-negative q-mb-sm">
                    <div v-for="err in errors[index]" :key="err">{{ err }}</div>
                  </div>

                  <template v-if="ordering">
                    <q-btn flat round @click="setPosImageUp(index)">
                      <q-icon name="fas fa-angle-up" size="xs"/>
                    </q-btn>
                    <q-btn flat round @click="setPosImageDown(index)">
                      <q-icon name="fas fa-angle-down" size="xs"/>
                    </q-btn>
                  </template>

                  <q-btn @click="removeFile(index)" round flat size="sm">
                    <q-icon name="fas fa-trash"></q-icon>
                  </q-btn>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {ref, watchEffect} from 'vue';
import {Notify} from 'quasar'

function returnFileSize(number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
}

export default {
  name: 'FileUploaderField',
  props: {
    multiple: {default: true, type: Boolean},
    gallery: { default: false, type: Boolean },
    label: {default: 'Drag and drop files or click here'},
    modelValue: {
      required: true,
    },
    lastOrderNum: {
      default: 0
    },
    ordering: {
      default: false,
      type: Boolean
    },
    errors: {
      type: Array
    },
    maxFiles: {
      type: Number
    },
    maxFileSizeInMB: {
      type: Number
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const fileInput = ref<HTMLInputElement>()
    const fileList = ref<Array<File>>([])
    const tmpError = ref()
    const validationErrors = ref([])

    function preventDefaults(e) {
      e.preventDefault()
    }

    const emitVal = function () {
      tmpError.value = undefined
      emit('update:modelValue', fileList.value)
    }

    const fileSize = function (file) {
      return returnFileSize(file.size)
    }

    const events = ['dragenter', 'dragover', 'dragleave', 'drop']
    events.forEach((eventName) => {
      document.body.addEventListener(eventName, preventDefaults)
    })


    const click = function () {
      if (!fileInput.value) {
        return
      }
      validationErrors.value = []
      fileInput.value.click()
    }

    const addFile = function (file: File): boolean {
      /**
       *  @return {boolean} True if added else false
       */
      if (props.maxFiles && fileList.value.length >= props.maxFiles) {
        Notify.create({
          position: 'top',
          message: 'Maximale Anzahl von Dateien erreicht.',
          color: 'warning',
          caption: `${file.name}`
        })
        // validationErrors.value.push(`"${file.name}" konnte nicht hinzugefügt werden. Maximale Anzahl von ${props.maxFiles} Dateien erreicht.`)
        return false
      }

      if (props.maxFileSizeInMB && file.size > props.maxFileSizeInMB * 1024 * 1024) {
        Notify.create({
          position: 'top',
          message: `Maximale Größe von ${props.maxFileSizeInMB} MB überschritten.`,
          color: 'warning',
          caption: `${file.name}`
        })
        // validationErrors.value.push(`"${file.name}" konnte nicht hinzugefügt werden. Maximale Größe von ${props.maxFileSizeInMB} MB überschritten.`)
        return false
      }

      fileList.value.push(file)
      return true
    }

    const changeFile = function () {
      if (!fileInput.value || !fileInput.value?.files) {
        return
      }

      for (let index = 0; index < fileInput.value.files.length; index++) {
        const file: File = fileInput.value.files[index];
        addFile(file)
      }
      emitVal()
    }

    const getUrl = function (file) {
      return URL.createObjectURL(file)
    }
    const removeFile = function (index) {
      fileList.value.splice(index, 1)
      emitVal()
    }

    const drop = function (e) {
      for (let index = 0; index < e.dataTransfer.files.length; index++) {
        addFile(e.dataTransfer.files[index])
      }
      emitVal()
    }

    watchEffect(() => {
      tmpError.value = props.errors
    })

    const setPosImageUp = function (pos) {
      if (pos <= 0) return
      const element = fileList.value.splice(pos, 1)[0];
      fileList.value.splice(pos - 1, 0, element);
      emitVal()
    }

    const setPosImageDown = function (pos) {
      if (pos >= fileList.value.length) return
      const element = fileList.value.splice(pos, 1)[0];
      fileList.value.splice(pos + 1, 0, element);
      emitVal()
    }

    return {
      click,
      fileInput,
      changeFile,
      fileList,
      getUrl,
      drop,
      removeFile,
      fileSize,
      setPosImageUp,
      setPosImageDown,
      tmpError,
      validationErrors,
    }
  }
}
</script>

<style scoped>
.c-upload-wrapper {
  border: 3px black dashed;
  width: 100%;
  height: 10rem;
  padding: 24px;
  text-align: center;
}

</style>
