declare const _default: {
    CookieConsentCmp: {
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
        CookieScript: {
            new ({ name, slug, description, label, onAccept, onDecline, required }: {
                name: any;
                slug: any;
                description: any;
                label: any;
                onAccept: any;
                onDecline: any;
                required: any;
            }): {
                name: any;
                description: any;
                label: any;
                slug: any;
                required: any;
                onAccept(): void;
                onDecline(): void;
                isActive(): boolean;
                setCookie(val: any): void;
                removeCookie(): void;
            };
        };
    };
    install(Vue: any, options: any): void;
};
export default _default;
