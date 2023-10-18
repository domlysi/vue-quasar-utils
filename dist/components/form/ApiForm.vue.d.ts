declare const _default: import("vue").DefineComponent<{
    optionFields: {
        required: true;
    };
    requiredSuffix: {
        default: string;
    };
    dark: {
        default: boolean;
    };
    disabled: {
        default: boolean;
    };
    cleanData: {
        default: boolean;
        type: BooleanConstructor;
    };
    formClass: {
        default: string;
    };
    fieldClass: {
        default: string;
    };
    fieldsConfig: {
        default: {};
    };
    errors: {
        default: undefined;
    };
    modelValue: {
        required: true;
        default: {};
    };
    showReadonlyFields: {
        type: BooleanConstructor;
        default: boolean;
    };
}, {
    fields: import("vue").Ref<any>;
    inputAttrs: (field: any) => {
        [x: string]: any;
    };
    formData: import("vue").Ref<{}>;
    onSubmit: () => void;
    getFieldComponent: (fieldType: any) => any;
    getFieldType: (fieldType: any) => any;
}, any, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "submit")[], "update:modelValue" | "submit", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    optionFields: {
        required: true;
    };
    requiredSuffix: {
        default: string;
    };
    dark: {
        default: boolean;
    };
    disabled: {
        default: boolean;
    };
    cleanData: {
        default: boolean;
        type: BooleanConstructor;
    };
    formClass: {
        default: string;
    };
    fieldClass: {
        default: string;
    };
    fieldsConfig: {
        default: {};
    };
    errors: {
        default: undefined;
    };
    modelValue: {
        required: true;
        default: {};
    };
    showReadonlyFields: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onSubmit?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    dark: boolean;
    modelValue: {};
    errors: undefined;
    disabled: boolean;
    requiredSuffix: string;
    cleanData: boolean;
    formClass: string;
    fieldClass: string;
    fieldsConfig: {};
    showReadonlyFields: boolean;
}, {}>;
export default _default;
