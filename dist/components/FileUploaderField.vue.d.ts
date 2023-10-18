declare const _default: import("vue").DefineComponent<{
    multiple: {
        default: boolean;
        type: BooleanConstructor;
    };
    gallery: {
        default: boolean;
        type: BooleanConstructor;
    };
    label: {
        default: string;
    };
    modelValue: {
        required: true;
    };
    lastOrderNum: {
        default: number;
    };
    ordering: {
        default: boolean;
        type: BooleanConstructor;
    };
    errors: {
        type: ArrayConstructor;
    };
    maxFiles: {
        type: NumberConstructor;
    };
    maxFileSizeInMB: {
        type: NumberConstructor;
    };
}, {
    click: () => void;
    fileInput: import("vue").Ref<HTMLInputElement | undefined>;
    changeFile: () => void;
    fileList: import("vue").Ref<{
        readonly lastModified: number;
        readonly name: string;
        readonly webkitRelativePath: string;
        readonly size: number;
        readonly type: string;
        arrayBuffer: () => Promise<ArrayBuffer>;
        slice: (start?: number | undefined, end?: number | undefined, contentType?: string | undefined) => Blob;
        stream: () => ReadableStream<Uint8Array>;
        text: () => Promise<string>;
    }[]>;
    getUrl: (file: any) => string;
    drop: (e: any) => void;
    removeFile: (index: any) => void;
    fileSize: (file: any) => string | undefined;
    setPosImageUp: (pos: any) => void;
    setPosImageDown: (pos: any) => void;
    tmpError: import("vue").Ref<any>;
    validationErrors: import("vue").Ref<never[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    multiple: {
        default: boolean;
        type: BooleanConstructor;
    };
    gallery: {
        default: boolean;
        type: BooleanConstructor;
    };
    label: {
        default: string;
    };
    modelValue: {
        required: true;
    };
    lastOrderNum: {
        default: number;
    };
    ordering: {
        default: boolean;
        type: BooleanConstructor;
    };
    errors: {
        type: ArrayConstructor;
    };
    maxFiles: {
        type: NumberConstructor;
    };
    maxFileSizeInMB: {
        type: NumberConstructor;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {
    label: string;
    multiple: boolean;
    gallery: boolean;
    lastOrderNum: number;
    ordering: boolean;
}, {}>;
export default _default;
