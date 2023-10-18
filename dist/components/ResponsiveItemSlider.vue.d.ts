declare const _default: import("vue").DefineComponent<{
    infiniteScroll: {
        default: boolean;
    };
    infiniteScrollOffset: {
        default: number;
    };
    loading: {
        default: boolean;
    };
    loadingMore: {
        default: boolean;
    };
    items: {
        required: true;
        default: () => never[];
        type: ArrayConstructor;
    };
    itemWidth: {
        default: string;
    };
    itemMaxWidth: {
        default: string;
    };
    itemMinWidth: {
        default: string;
    };
    itemClass: {
        default: string;
    };
    wrapperClass: {
        required: false;
    };
    wrapperStyle: {
        required: false;
    };
    colClasses: {
        default: string;
    };
    onlyVertical: {
        default: boolean;
    };
    isMarginLeft: {
        default: boolean;
    };
    withContainer: {
        default: boolean;
    };
    skeletonAmount: {
        default: number;
    };
    skeletonAmountMobile: {
        default: number;
    };
    id: {
        required: false;
        type: StringConstructor;
    };
    saveScrollPos: {
        default: boolean;
    };
    store: {
        required: false;
    };
}, {
    mobileWrapperRef: import("vue").Ref<any>;
    handleScroll: ((this: unknown, e?: any) => void) & {
        cancel(): void;
    };
}, any, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "load"[], "load", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    infiniteScroll: {
        default: boolean;
    };
    infiniteScrollOffset: {
        default: number;
    };
    loading: {
        default: boolean;
    };
    loadingMore: {
        default: boolean;
    };
    items: {
        required: true;
        default: () => never[];
        type: ArrayConstructor;
    };
    itemWidth: {
        default: string;
    };
    itemMaxWidth: {
        default: string;
    };
    itemMinWidth: {
        default: string;
    };
    itemClass: {
        default: string;
    };
    wrapperClass: {
        required: false;
    };
    wrapperStyle: {
        required: false;
    };
    colClasses: {
        default: string;
    };
    onlyVertical: {
        default: boolean;
    };
    isMarginLeft: {
        default: boolean;
    };
    withContainer: {
        default: boolean;
    };
    skeletonAmount: {
        default: number;
    };
    skeletonAmountMobile: {
        default: number;
    };
    id: {
        required: false;
        type: StringConstructor;
    };
    saveScrollPos: {
        default: boolean;
    };
    store: {
        required: false;
    };
}>> & {
    onLoad?: ((...args: any[]) => any) | undefined;
}, {
    loading: boolean;
    infiniteScroll: boolean;
    infiniteScrollOffset: number;
    loadingMore: boolean;
    items: unknown[];
    itemWidth: string;
    itemMaxWidth: string;
    itemMinWidth: string;
    itemClass: string;
    colClasses: string;
    onlyVertical: boolean;
    isMarginLeft: boolean;
    withContainer: boolean;
    skeletonAmount: number;
    skeletonAmountMobile: number;
    saveScrollPos: boolean;
}, {}>;
export default _default;
