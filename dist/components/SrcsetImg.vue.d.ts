declare const _default: import("vue").DefineComponent<{
    src: {
        required: true;
    };
    srcset: {
        required: false;
    };
    showPlaceholder: {
        default: boolean;
        type: BooleanConstructor;
    };
}, any, any, {
    srcSetInline(): any;
    sizes(): any;
}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    src: {
        required: true;
    };
    srcset: {
        required: false;
    };
    showPlaceholder: {
        default: boolean;
        type: BooleanConstructor;
    };
}>>, {
    showPlaceholder: boolean;
}, {}>;
export default _default;
