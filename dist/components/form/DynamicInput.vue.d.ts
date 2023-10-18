import { PropType } from "vue";
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
declare const _default: import("vue").DefineComponent<{
    field: {
        required: true;
        type: PropType<Field>;
    };
    fieldComponent: {
        default: undefined;
        type: ObjectConstructor;
    };
    errors: {
        default: undefined;
        type: ArrayConstructor;
    };
    modelValue: {
        required: true;
    };
}, {
    component: import("vue").ComputedRef<Record<string, any> | {
        component: any;
        attrs: any;
        handlers: {};
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    field: {
        required: true;
        type: PropType<Field>;
    };
    fieldComponent: {
        default: undefined;
        type: ObjectConstructor;
    };
    errors: {
        default: undefined;
        type: ArrayConstructor;
    };
    modelValue: {
        required: true;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    errors: unknown[];
    fieldComponent: Record<string, any>;
}, {}>;
export default _default;
