declare const _default: import("vue").DefineComponent<{
    title: {
        required: false;
    };
    text: {
        required: false;
    };
    btnAcceptLabel: {
        required: false;
        default: string;
    };
    btnDenyLabel: {
        required: false;
        default: string;
    };
    btnSettingLabel: {
        required: false;
        default: string;
    };
    btnSaveLabel: {
        required: false;
        default: string;
    };
    btnCancelLabel: {
        required: false;
        default: string;
    };
    modelValue: {
        default: boolean;
        required: true;
    };
    disabled: {
        default: boolean;
    };
}, {
    accept: () => void;
    cookieConsent: {
        cookieScripts: any[];
        isProcessed: boolean;
        getAll(): any[];
        add(cookieScript: any): void;
        removeNotRequiredCookies(): void;
        processScripts(): void;
        init(): void;
        accept({ all }: {
            all: any;
        }): void;
    };
    showSettings: import("vue").Ref<boolean>;
    settingsModal: () => void;
    deny: () => void;
    save: () => void;
    cookieScripts: import("vue").Ref<never[]>;
    cookieToggle: (item: any) => void;
    isCookieActives: (itemSlug: any) => boolean;
    cookieStatus: {};
    close: typeof close;
} | undefined, any, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "close" | "accepted" | "acceptedBtnClick" | "deny" | "denyBtnClick")[], "update:modelValue" | "close" | "accepted" | "acceptedBtnClick" | "deny" | "denyBtnClick", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        required: false;
    };
    text: {
        required: false;
    };
    btnAcceptLabel: {
        required: false;
        default: string;
    };
    btnDenyLabel: {
        required: false;
        default: string;
    };
    btnSettingLabel: {
        required: false;
        default: string;
    };
    btnSaveLabel: {
        required: false;
        default: string;
    };
    btnCancelLabel: {
        required: false;
        default: string;
    };
    modelValue: {
        default: boolean;
        required: true;
    };
    disabled: {
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onAccepted?: ((...args: any[]) => any) | undefined;
    onAcceptedBtnClick?: ((...args: any[]) => any) | undefined;
    onDeny?: ((...args: any[]) => any) | undefined;
    onDenyBtnClick?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: boolean;
    btnAcceptLabel: string;
    btnDenyLabel: string;
    btnSettingLabel: string;
    btnSaveLabel: string;
    btnCancelLabel: string;
    disabled: boolean;
}, {}>;
export default _default;
