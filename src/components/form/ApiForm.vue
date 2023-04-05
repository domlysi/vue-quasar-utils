<template>
  <q-form v-if="fields" :class="formClass" :dark="dark" @submit="onSubmit">
    <div class="col-12" v-if="errors?.non_field_errors">
      <slot name="nonFieldError">
        <q-banner class="bg-negative text-white">{{ errors.non_field_errors.join(' ') }}</q-banner>
      </slot>
    </div>
    <template v-for="field in fields" :key="field.attrs.name">
      <component
          :type="getFieldType(field.attrs.type)"
          :class="fieldClass"
          :is="getFieldComponent(field.type)"
          v-bind="inputAttrs(field)"
          :rules="field.rules"
          v-model="formData[field.attrs.name]"
          :errors="errors ? errors[field.attrs.name]: undefined"
          :dark="dark"
      >
        <slot :name="`default.${field.attrs.name}`"></slot>
      </component>
    </template>

    <slot name="extras"></slot>

    <slot name="submit">
      <div class="col-12">
        <q-btn type="submit">Submit</q-btn>
      </div>
    </slot>
  </q-form>
</template>

<script>
import {ref, watch} from 'vue'
import {fieldComponentMapping, fieldTypeMapping} from './fieldMapping';

import deepmerge from 'deepmerge'

export default {
  name: 'ApiForm',
  emits: ['update:modelValue', 'submit'],
  props: {
    optionFields: {
      required: true,
    },
    requiredSuffix: {
      default: '*'
    },
    dark: {
      default: false
    },
    formClass: {
      default: 'row q-col-gutter-md'
    },
    fieldClass: {
      default: 'col-12'
    },
    fieldsConfig: {
      default: {}
    },
    errors: {
      default: undefined
    },
    modelValue: {
      required: true
    },
  },

  setup(props, context) {
    const fields = ref()
    const formData = ref(props.modelValue || {})

    const onSubmit = function (e) {
      context.emit('update:modelValue', formData.value)
      context.emit('submit', formData.value)
    }

    watch(
        () => props.modelValue,
        () => {
          parseFields()
        },
        {deep: true}
    )

    watch(
        () => formData.value,
        () => {
          context.emit('update:modelValue', formData.value)
        },
        {deep: true}
    )

    watch(
        () => props.optionFields,
        (count, prevCount) => {
          fields.value = parseFields()
        }
    )

    const parseFields = function () {
      if (!props.optionFields) {
        return
      }
      let ret = []
      for (const [key, value] of Object.entries(props.optionFields)) {
        if (props.modelValue && props.modelValue.hasOwnProperty(key)) {
          formData.value[key] = props.modelValue[key]
        } else if (value?.default) {
          formData.value[key] = value.default
        }

        let label = props.requiredSuffix && value.required ? `${value.label} ${props.requiredSuffix}` : value.label

        let fieldConf = {
          attrs: {
            name: key,
            label,
            readOnly: value.read_only,
            required: value.required,
            hint: value.help_text,
          },
          type: value.type
        }

        // overwrite with fieldsConfig
        fieldConf = deepmerge(fieldConf, props.fieldsConfig[key] || {})
        ret.push(fieldConf)
      }
      return ret
    }

    const getFieldComponent = (fieldType) => {
      return fieldComponentMapping[fieldType]
    }
    const getFieldType = (fieldType) => {
      return fieldTypeMapping[fieldType]
    }

    const inputAttrs = function (field) {
      return deepmerge(field.attrs, context.attrs)
    }

    return {
      fields,
      inputAttrs,
      formData,
      onSubmit,
      getFieldComponent,
      getFieldType
    }
  }
}
</script>