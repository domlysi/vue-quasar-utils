<template>
  <div>
    <component
      :is="component.component"
      :error="!!errors ? true : undefined"
      :error-message="errors ? errors.join(' ') : undefined"
      :model-value="component.attrs.modelValue"
      v-bind="component.attrs"
      v-on="component.handlers"
      @update:model-value="
        (val) => {
          $emit('update:modelValue', val);
          component.attrs.modelValue = val;
        }
      "
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="data">
        <slot v-bind:slot="data" :name="name"></slot>
      </template>
    </component>

    <template
        v-if="component.component?.name === 'QCheckbox' && component.attrs.hint"
    >
      <div class="text-muted text-small">{{ component.attrs.hint }}</div>
    </template>
  </div>
</template>

<script lang="ts">
import {QCheckbox, QFile, QInput, QSelect} from "quasar";
import {computed, defineComponent, PropType} from "vue";

export interface FieldOption {
  value: string;
  display_name: string;
}

export interface Field {
  type: string;
  required: boolean;
  read_only: boolean;
  label: string;
  children?: Array<Field>;
  choices?: Array<FieldOption>;
  max_length: number;
  help_text: string;
}

const TYPE_MAPPING = {
  field: undefined,
  boolean: {
    component: QCheckbox,
    attrs: {},
  },
  string: {
    component: QInput,
    attrs: {
      type: "text",
    },
  },
  url: {
    component: QInput,
    attrs: {
      type: "url",
    },
  },
  email: {
    component: QInput,
    attrs: {
      type: "email",
    },
  },
  regex: {
    component: QInput,
  },
  slug: {
    component: QInput,
  },
  integer: {
    component: QInput,
    attrs: {
      type: "number",
    },
  },
  float: {
    component: QInput,
    attrs: {
      type: "number",
    },
  },
  decimal: {
    component: QInput,
    attrs: {
      type: "number",
    },
  },
  date: {
    component: QInput,
    attrs: {
      type: "date",
    },
  },
  datetime: {
    component: QInput,
    attrs: {
      type: "date",
    },
  },
  time: {
    component: QInput,
    attrs: {
      type: "time",
    },
  },
  choice: {
    component: QSelect,
  },
  "multiple choice": {
    component: undefined,
  },
  "file upload": {
    component: QFile,
  },
  "image upload": {
    component: QFile,
  },
  list: {
    component: undefined,
  },
  "nested object": {
    component: undefined,
  },
};

export default defineComponent({
  name: "DynamicInput",
  props: {
    field: {
      required: true,
      type: Object as PropType<Field>,
    },
    fieldComponent: {
      default: undefined,
      type: Object,
    },
    errors: {
      default: undefined,
    },
    modelValue: {
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const component = computed(() => {
      if (props.fieldComponent) {
        return props.fieldComponent;
      }
      if (!props.field?.type) {
        throw `no field type given`;
      }
      if (!TYPE_MAPPING[props.field.type]) {
        throw `Field "${props.field.type}" has no component in mapping.`;
      }

      let r = {
        component: TYPE_MAPPING[props.field.type]["component"],
        attrs: {
          ...TYPE_MAPPING[props.field.type]["attrs"],
          label: props.field.label,
          required: props.field.required,
          hint: props.field.help_text,
          readonly: props.field.read_only,
          maxlength: props.field.max_length,
          behavior: "menu",
          modelValue: props.modelValue,
          ...ctx.attrs,
        },
        handlers: {},
      };

      if (r.attrs.required) {
        r["attrs"]["label"] = r["attrs"]["label"] + " *";
      }

      if (r["component"] === QSelect) {
        r.attrs["modelValue"] =
            r.attrs["modelValue"] === undefined ? null : r.attrs["modelValue"];
        if (props.field.choices) {
          r.attrs["options"] = props.field.choices.flatMap((obj) => {
            return {
              label: obj["display_name"],
              value: obj["value"],
            };
          });
        }
      }

      if (r["component"] === QCheckbox) {
        r.attrs["class"] = !r.attrs?.class ? "q-py-sm" : r.attrs.class;
        if (ctx.attrs["no-indeterminate"]) {
          r.attrs["modelValue"] = r.attrs["modelValue"] || false;
        }
      }

      r.attrs = {
        ...r.attrs,
        ...ctx.attrs,
      };

      return r;
    });

    return {
      component,
    };
  },
});
</script>
