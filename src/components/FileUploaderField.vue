<template>
  <div class="row">
    <div @drop.prevent="drop" @click="click" class="c-upload-wrapper q-mb-lg bg-grey-3 flex flex-center column cursor-pointer">
      <div>
        <q-icon name="fas fa-file-arrow-up" size="lg" />
        <input
            v-bind="inputProps"
            :multiple="multiple"
            @change="changeFile"
            ref="fileInput"
            type="file"
            class="hidden"
            name="files"
        >
      </div>
      <div>{{ label }}</div>
    </div>

    <template v-if="fileList">
      <div class="col-12">
        <div class="">


          <template v-if="!gallery">
            <template v-for="(file, index) in fileList" :key="file.name">
              <div
                  class="text-bold flex items-center justify-between no-wrap q-my-md"
              >
                <div class="flex items-center no-wrap">
                  <div><q-icon name="far fa-file" size="lg"/></div>
                  <div class="q-px-sm" style="overflow-wrap: anywhere">{{file.name}} ({{fileSize(file)}})</div>
                </div>
                <div>
                  <q-btn @click="removeFile(index)" round flat size="sm"><q-icon name="fas fa-trash"></q-icon></q-btn>
                </div>
              </div>
            </template>
          </template>

          <!-- Gallery view -->
          <template v-else>
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6" v-for="(file, index) in fileList" :key="file.name">
                <template v-if="file.type.startsWith('image/')">
                  <img style="max-height: 200px; object-fit: contain" class="full-width" :src="getUrl(file)" />
                </template>
                <template v-else>
                  <div class="text-bold text-center" style="overflow-wrap: anywhere">
                    <q-icon name="far fa-file" /> {{file.name}}
                  </div>
                </template>
                <div class="text-center">
                  <div>{{fileSize(file)}}</div>
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
import {ref} from 'vue';

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
    label: { default: 'Drag and drop files or click here'},
    inputProps: {
      type: Object
    },
    modelValue: {
      required: true,
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const fileInput = ref<HTMLInputElement>()
    const fileList = ref<Array<File>>([])

    function preventDefaults(e) {
      e.preventDefault()
    }

    const emitVal = function () {
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
      if (!fileInput.value) { return }
      fileInput.value.click()
    }

    const changeFile = function () {
      if (!fileInput.value || !fileInput.value?.files) { return }

      for (let index = 0; index < fileInput.value.files.length; index++) {
        const file: File = fileInput.value.files[index];
        fileList.value.push(file)
      }
      emitVal()
    }

    const getUrl = function (file) {
      return URL.createObjectURL(file)
    }
    const removeFile = function (index) {
      fileList.value.splice(index, 1)
    }

    const drop = function (e) {
      for (let index = 0; index < e.dataTransfer.files.length; index++) {
        fileList.value.push(e.dataTransfer.files[index])
      }
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