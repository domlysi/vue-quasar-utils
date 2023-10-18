declare const _default: import("vue").DefineComponent<{
    email: {
        type: StringConstructor;
        required: true;
    };
    subject: {
        type: StringConstructor;
        required: false;
    };
}, {
    emailRef: import("vue").Ref<any>;
    click: () => void;
}, any, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    email: {
        type: StringConstructor;
        required: true;
    };
    subject: {
        type: StringConstructor;
        required: false;
    };
}>>, {}, {}>;
export default _default;
